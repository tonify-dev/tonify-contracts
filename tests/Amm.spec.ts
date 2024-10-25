import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, fromNano, toNano } from '@ton/core';
import { loadDealCreatedEvent, loadDealData, Market, storeCreateDeal, storeTakeDeal } from '../wrappers/Market';
import '@ton/test-utils';
import { MyJetton } from '../wrappers/MyJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { OracleMock, storeCheckAndReturnPrice, storeCheckAndReturnPriceForTest } from '../wrappers/OracleMock';
import { Deal } from '../wrappers/Deal';

const DEAL_STATUS_CREATED = 1n;
const DEAL_STATUS_ACCEPTED = 2n;
const DEAL_STATUS_CANCELLED = 3n;
const DEAL_STATUS_COMPLETED = 4n;
const DEAL_STATUS_EXPIRED = 5n;

const RATE_DENOMINATOR = 10n ** 8n;
import { Amm } from '../wrappers/Amm';

describe('Amm', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let owner: SandboxContract<TreasuryContract>;
    let operator: SandboxContract<TreasuryContract>;
    let operatorFeeAddress: SandboxContract<TreasuryContract>;
    let serviceFeeAddress: SandboxContract<TreasuryContract>;
    let amm: SandboxContract<Amm>;
    let jettonMaster: SandboxContract<MyJetton>;
    let jettonWallet: SandboxContract<JettonDefaultWallet>;
    let jettonWalletTaker: SandboxContract<JettonDefaultWallet>;
    let jettonWalletMaker: SandboxContract<JettonDefaultWallet>;
    let jettonWalletOwner: SandboxContract<JettonDefaultWallet>;
    let jettonWalletOperator: SandboxContract<JettonDefaultWallet>;
    let jettonWalletAmm: SandboxContract<JettonDefaultWallet>;
    let oracle: SandboxContract<OracleMock>;
    let maker: SandboxContract<TreasuryContract>;
    let taker: SandboxContract<TreasuryContract>;
    let factory: SandboxContract<TreasuryContract>;
    let market: SandboxContract<Market>;
    let deal: SandboxContract<Deal>;
    let marketBalance: bigint;
    const feedIdAsset = 34n;
    const feedIdToken = 35n;
    const serviceFee = toNano('0.01'); // 1%
    const operatorFee = toNano('0.01'); // 1%
    const content = beginCell().endCell();
    const duration = 60n * 60n * 24n * 30n; // 10 days
    const underlyingAssetName = 'USDT';
    const ZERO_ADDRESS = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');
    const SLIPPAGE_DENOMINATOR = 10n ** 25n;
    const COLLATERAL_DENOMINATOR = 10n ** 16n;

    function getAmount(rateAsset: bigint, rateToken: bigint, percent: bigint, slippage: bigint): bigint {
        return (rateAsset * rateToken * percent) / COLLATERAL_DENOMINATOR + (rateAsset * rateToken * percent * slippage) / SLIPPAGE_DENOMINATOR;
    }

    function getAmountWithoutSlippage(rateAsset: bigint, rateToken: bigint, percent: bigint): bigint {
        return (rateAsset * rateToken * percent) / COLLATERAL_DENOMINATOR;
    }

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        owner = await blockchain.treasury('owner');
        operatorFeeAddress = await blockchain.treasury('operatorFeeAddress');
        serviceFeeAddress = await blockchain.treasury('serviceFeeAddress');
        blockchain.now = Math.floor(Date.now() / 1000);
        taker = await blockchain.treasury('taker');
        maker = await blockchain.treasury('maker');
        factory = await blockchain.treasury('factory');
        amm = blockchain.openContract(await Amm.fromInit(0n, factory.address));
        operator = await blockchain.treasury('operator');
        jettonMaster = blockchain.openContract(
            await MyJetton.fromInit(owner.address, beginCell().endCell(), toNano('1000000000')),
        );
        const mintResult = await jettonMaster.send(
            owner.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Mint',
                amount: toNano('100000000'),
                receiver: taker.address,
            },
        );

        const mintResult2 = await jettonMaster.send(
            owner.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Mint',
                amount: toNano('100000000'),
                receiver: maker.address,
            },
        );

        expect(mintResult.transactions).toHaveTransaction({
            from: owner.address,
            to: jettonMaster.address,
            success: true,
            deploy: true,
        });
        expect(mintResult2.transactions).toHaveTransaction({
            from: owner.address,
            to: jettonMaster.address,
            success: true,
            deploy: false,
        });

        oracle = blockchain.openContract(await OracleMock.fromInit(0n));
        const oracleDeployResult = await oracle.send(
            owner.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(oracleDeployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: oracle.address,
            success: true,
            deploy: true,
        });

        market = blockchain.openContract(
            await Market.fromInit(
                0n,
                owner.address,
                jettonMaster.address,
                amm.address,
                factory.address,
                underlyingAssetName,
                duration,
                content,
                operatorFee,
                serviceFee,
                oracle.address,
                feedIdAsset,
                feedIdToken,
                operatorFeeAddress.address,
            ),
        );

        jettonWallet = blockchain.openContract(
            await JettonDefaultWallet.fromInit(market.address, jettonMaster.address),
        );
        jettonWalletTaker = blockchain.openContract(
            await JettonDefaultWallet.fromInit(taker.address, jettonMaster.address),
        );
        jettonWalletMaker = blockchain.openContract(
            await JettonDefaultWallet.fromInit(maker.address, jettonMaster.address),
        );
        jettonWalletOwner = blockchain.openContract(
            await JettonDefaultWallet.fromInit(owner.address, jettonMaster.address),
        );
        jettonWalletOperator = blockchain.openContract(
            await JettonDefaultWallet.fromInit(operator.address, jettonMaster.address),
        );
        jettonWalletAmm = blockchain.openContract(
            await JettonDefaultWallet.fromInit(amm.address, jettonMaster.address),
        );

        const deployResult = await market.send(
            factory.getSender(),
            {
                value: toNano('0.55'),
            },
            {
                $$type: 'InnerDeployMarket',
                queryId: 0n,
                jettonWallet: jettonWallet.address,
                originalGasTo: factory.address,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: factory.address,
            to: market.address,
            deploy: true,
            success: true,
        });
        await jettonWalletMaker.send(
            maker.getSender(),
            {
                value: toNano('0.6'),
            },
            {
                $$type: 'TokenTransfer',
                amount: 1n,
                query_id: 0n,
                recipient: market.address,
                response_destination: maker.address,
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().asSlice(),
            },
        );
        await jettonWalletMaker.send(
            maker.getSender(),
            {
                value: toNano('0.6'),
            },
            {
                $$type: 'TokenTransfer',
                amount: 1n,
                query_id: 0n,
                recipient: owner.address,
                response_destination: maker.address,
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().asSlice(),
            },
        );
        await jettonWalletMaker.send(
            maker.getSender(),
            {
                value: toNano('0.6'),
            },
            {
                $$type: 'TokenTransfer',
                amount: toNano('10.01'),
                query_id: 0n,
                recipient: amm.address,
                response_destination: maker.address,
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().asSlice(),
            },
        );
        await jettonWalletMaker.send(
            maker.getSender(),
            {
                value: toNano('0.6'),
            },
            {
                $$type: 'TokenTransfer',
                amount: 1n,
                query_id: 0n,
                recipient: operator.address,
                response_destination: maker.address,
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().asSlice(),
            },
        );
        const ammDeployResult = await amm.send(
            factory.getSender(),
            {
                value: toNano('0.15'),
            },
            {
                $$type: 'InnerDeployAmm',
                queryId: 0n,
                jettonWallet: jettonWalletAmm.address,
                originalGasTo: factory.address,
                market: market.address,
            },
        );
        expect(ammDeployResult.transactions).toHaveTransaction({
            from: factory.address,
            to: amm.address,
            deploy: true,
            success: true,
        });
    });

    afterEach(async () => {
        expect((await market.getMapQueriesToContext()).size).toEqual(0);
        marketBalance = await market.getBalance();
        expect(Number.parseFloat(fromNano(marketBalance))).toBeGreaterThanOrEqual(0.09);
    });
    it('should deploy correctly', async () => {
        // Check all initial values using get methods of the market contract
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(await market.getAmm()).toEqualAddress(amm.address);
        expect(await market.getJettonWallet()).toEqualAddress(jettonWallet.address);
        expect(await market.getUnderlyingAssetName()).toEqual(underlyingAssetName);
        expect(await market.getDuration()).toEqual(duration);
        expect(await market.getCollectionContent()).toEqualCell(content);
        expect(await market.getOperatorFee()).toEqual(operatorFee);
        expect(await market.getServiceFee()).toEqual(serviceFee);
        expect(await market.getOracle()).toEqualAddress(oracle.address);
        expect(await market.getFeedIdAsset()).toEqual(feedIdAsset);
        expect(await market.getFeedIdToken()).toEqual(feedIdToken);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress.address);
        expect(await market.getCountDeal()).toEqual(0n);
    });

    it('should take deal automatically', async () => {
        const makerPosition = true;
        const rateAsset = toNano('0.1'); // 1 usd
        const rateToken = toNano('0.1'); // 1 usd
        const percent = toNano('1'); // 100%
        const expiration = 60n * 60n * 24n * 10n; // 10 days
        const slippage = toNano('0.01'); // 1%

        const createDealData = beginCell()
        .store(
            storeCreateDeal({
                $$type: 'CreateDeal',
                makerPosition: makerPosition,
                rateAsset: rateAsset,
                rateToken: rateToken,
                percent: percent,
                expiration: expiration,
                slippage: slippage,
                oracleData: beginCell()
                .store(
                    storeCheckAndReturnPriceForTest({
                        $$type: 'CheckAndReturnPriceForTest',
                        feedId: feedIdAsset,
                        price: rateAsset,
                        timestamp: BigInt(blockchain.now! * 1000),
                        needBounce: false,
                    }),
                )
                .endCell(),
                oracleData2: beginCell()
                .store(
                    storeCheckAndReturnPriceForTest({
                        $$type: 'CheckAndReturnPriceForTest',
                        feedId: feedIdToken,
                        price: rateToken,
                        timestamp: BigInt(blockchain.now! * 1000),
                        needBounce: false,
                    }),
                )
                .endCell(), 
            }),
            )
            .asSlice();

        const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
        const tonBalanceBefore = await maker.getBalance();
        const createDealResult = await jettonWalletMaker.send(
            maker.getSender(),
            {
                value: toNano('2.9'),
            },
            {
                $$type: 'TokenTransfer',
                amount: getAmount(rateAsset, rateToken, percent, slippage),
                query_id: 0n,
                recipient: market.address,
                response_destination: maker.address,
                custom_payload: null,
                forward_ton_amount: toNano('2.8'),
                forward_payload: createDealData,
            },
        );

        const { dealId } = loadDealCreatedEvent(createDealResult.externals[0].body.beginParse());
        const tonBalanceAfter = await maker.getBalance();
        console.log('User fee :' + fromNano(tonBalanceAfter - tonBalanceBefore));
        deal = blockchain.openContract(await Deal.fromInit(dealId, market.address));
        const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
        console.log('createDealResult', createDealResult.events);
        // console.log('createDealResult', createDealResult.transactions);
        expect(dealDataAfterTake.status).toEqual(DEAL_STATUS_ACCEPTED);
        verifyTransactions(createDealResult, [maker.address, market.address]);
    });
    
    async function verifyTransactions(result: any, fromAddresses: Address[]) {
        expect(result.transactions).not.toHaveTransaction({
            success: false,
            to: (a?: Address) => (fromAddresses.includes(a!)),
        });
    }
});
