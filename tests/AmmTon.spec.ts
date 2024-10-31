import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, fromNano, toNano, Transaction } from '@ton/core';
import { loadDealCreatedEvent, loadDealData, Market, storeCreateDeal, storeTakeDeal } from '../wrappers/Market';
import '@ton/test-utils';
import { MyJetton } from '../wrappers/MyJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { OracleMock, storeCheckAndReturnPrice, storeCheckAndReturnPriceForTest } from '../wrappers/OracleMock';
import { Deal } from '../wrappers/Deal';
import { MarketTon } from '../wrappers/MarketTon';
import { AmmTon } from '../wrappers/AmmTon';

const DEAL_STATUS_CREATED = 1n;
const DEAL_STATUS_ACCEPTED = 2n;
const DEAL_STATUS_CANCELLED = 3n;
const DEAL_STATUS_COMPLETED = 4n;
const DEAL_STATUS_EXPIRED = 5n;

const RATE_DENOMINATOR = 10n ** 8n;

describe('Market ton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let owner: SandboxContract<TreasuryContract>;
    let operator: SandboxContract<TreasuryContract>;
    let operatorFeeAddress: SandboxContract<TreasuryContract>;
    let serviceFeeAddress: SandboxContract<TreasuryContract>;
    let amm: SandboxContract<AmmTon>;
    let oracle: SandboxContract<OracleMock>;
    let maker: SandboxContract<TreasuryContract>;
    let taker: SandboxContract<TreasuryContract>;
    let factory: SandboxContract<TreasuryContract>;
    let market: SandboxContract<MarketTon>;
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
        return (
            (rateAsset * rateToken * percent) / COLLATERAL_DENOMINATOR +
            (rateAsset * rateToken * percent * slippage) / SLIPPAGE_DENOMINATOR
        );
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
        operator = await blockchain.treasury('operator');

        amm = blockchain.openContract(await AmmTon.fromInit(0n, factory.address, owner.address));

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
            await MarketTon.fromInit(
                0n,
                owner.address,
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

        const deployResult = await market.send(
            factory.getSender(),
            {
                value: toNano('0.55'),
            },
            {
                $$type: 'InnerDeployMarketTon',
                queryId: 0n,
                originalGasTo: factory.address,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: factory.address,
            to: market.address,
            deploy: true,
            success: true,
        });


        const ammDeployResult = await amm.send(
            factory.getSender(),
            {
                value: toNano('0.15'),
            },
            {
                $$type: 'InnerDeployAmmTon',
                queryId: 0n,
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

        await amm.send(
            owner.getSender(),
            {
                value: toNano('100.01'),
            },
            null
        );
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

        expect(await amm.getMarket()).toEqualAddress(market.address);

        console.log('amm balance', await amm.getBalance());
        console.log('amm deposited', await amm.getDeposited());
        console.log('amm balance - deposited', await amm.getBalance() - await amm.getDeposited());
    });


    it('should take deal automatically', async () => {
        const makerPosition = true;
        const rateAsset = toNano('0.1'); // 1 usd
        const rateToken = toNano('0.1'); // 1 usd
        const percent = toNano('1'); // 100%
        const expiration = 60n * 60n * 24n * 10n; // 10 days
        const slippage = toNano('0.01'); // 1%

  
        const balanceMakerBefore = await maker.getBalance();
        const balanceTakerBefore = await taker.getBalance();
        const balanceMarketBefore = await market.getBalance();
        const tonBalanceBefore = await maker.getBalance();
        const amount = getAmount(rateAsset, rateToken, percent, slippage);
        const createDealResult = await market.send(
            maker.getSender(),
            {
                value: toNano('0.5') + amount,
            },
            {
                $$type: 'CreateDealTon',
                deal: {
                    $$type: 'CreateDealData',
                    makerPosition: makerPosition,
                    rateAsset: rateAsset,
                    rateToken: rateToken,
                    percent: percent,
                    expiration: expiration,
                    slippage: slippage,
                    oracleAssetData: beginCell()
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
                    oracleTokenData: beginCell()
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
                },
                queryId: 0n,
            },
        );
      
        const { dealId } = loadDealCreatedEvent(createDealResult.externals[0].body.beginParse());
        const tonBalanceAfter = await maker.getBalance();
        console.log('User fee :' + fromNano(tonBalanceAfter - tonBalanceBefore + amount));
        deal = blockchain.openContract(await Deal.fromInit(dealId, market.address));
        const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
        // console.log('createDealResult', createDealResult.transactions);
        // console.log('createDealResult', createDealResult.events);
        expect(dealDataAfterTake.status).toEqual(DEAL_STATUS_ACCEPTED);
        verifyTransactionsFromManyAddresses(createDealResult, [maker.address, market.address]);
        const marketBalance = await market.getBalance();
        expect(marketBalance).toEqual(toNano('0.1') + (await market.getTonDepositBalance()));
    });
    async function verifyTransactionsFromManyAddresses(result: any, fromAddresses: Address[]) {
        expect(result.transactions).not.toHaveTransaction({
            success: false,
            to: (a?: Address) => fromAddresses.includes(a!),
        });
    }
});
