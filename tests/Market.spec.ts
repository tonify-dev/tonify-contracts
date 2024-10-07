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

describe('Market', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let owner: SandboxContract<TreasuryContract>;
    let operator: SandboxContract<TreasuryContract>;
    let operatorFeeAddress: SandboxContract<TreasuryContract>;
    let serviceFeeAddress: SandboxContract<TreasuryContract>;
    let amm: SandboxContract<TreasuryContract>;
    let jettonMaster: SandboxContract<MyJetton>;
    let jettonWallet: SandboxContract<JettonDefaultWallet>;
    let jettonWalletTaker: SandboxContract<JettonDefaultWallet>;
    let jettonWalletMaker: SandboxContract<JettonDefaultWallet>;
    let jettonWalletOwner: SandboxContract<JettonDefaultWallet>;
    let jettonWalletOperator: SandboxContract<JettonDefaultWallet>;
    let oracle: SandboxContract<OracleMock>;
    let maker: SandboxContract<TreasuryContract>;
    let taker: SandboxContract<TreasuryContract>;
    let factory: SandboxContract<TreasuryContract>;
    let market: SandboxContract<Market>;
    let deal: SandboxContract<Deal>;
    let marketBalance: bigint;
    const feedId = 34n;
    const serviceFee = toNano('0.01'); // 1%
    const operatorFee = toNano('0.01'); // 1%
    const content = beginCell().endCell();
    const duration = 60n * 60n * 24n * 30n; // 10 days
    const underlyingAssetName = 'USDT';
    const ZERO_ADDRESS = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');
    const SLIPPAGE_DENOMINATOR = 10n ** 17n;
    const COLLATERAL_DENOMINATOR = 10n ** 8n;

    function getAmount(rate: bigint, percent: bigint, slippage: bigint): bigint {
        return (rate * percent) / COLLATERAL_DENOMINATOR + (rate * percent * slippage) / SLIPPAGE_DENOMINATOR;
    }

    function getAmountWithoutSlippage(rate: bigint, percent: bigint): bigint {
        return (rate * percent) / COLLATERAL_DENOMINATOR;
    }

    // function getPercentFromAmount(rate: bigint, amount: bigint, slippage: bigint) {
    //     const baseAmount = (amount * SLIPPAGE_DENOMINATOR) / (SLIPPAGE_DENOMINATOR + slippage);
    //     return (baseAmount * COLLATERAL_DENOMINATOR) / rate;
    // }
    // function getPercentFromAmount(rate: bigint, amount: bigint, slippage: bigint) {
    //     return ((amount - (rate * slippage) / 10000n) * 100n) / rate;
    // }

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        owner = await blockchain.treasury('owner');
        operatorFeeAddress = await blockchain.treasury('operatorFeeAddress');
        serviceFeeAddress = await blockchain.treasury('serviceFeeAddress');
        blockchain.now = Math.floor(Date.now() / 1000);
        amm = await blockchain.treasury('amm');
        taker = await blockchain.treasury('taker');
        maker = await blockchain.treasury('maker');
        factory = await blockchain.treasury('factory');
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
                ZERO_ADDRESS,
                factory.address,
                underlyingAssetName,
                duration,
                content,
                operatorFee,
                serviceFee,
                oracle.address,
                feedId,
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


        const deployResult = await market.send(
            factory.getSender(),
            {
                value: toNano('0.55'),
            },
            {
                $$type: 'InnerDeployMarket',
                queryId: 0n,
                jettonWallet: jettonWallet.address,
            },
        );
        // console.log(deployResult);

        // console.log(deployResult.transactions);

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
                amount: 1n,
                query_id: 0n,
                recipient: operator.address,
                response_destination: maker.address,
                custom_payload: null,
                forward_ton_amount: 0n,
                forward_payload: beginCell().asSlice(),
            },
        );
    });

    afterEach(async () => {
        expect((await market.getMapQueriesToContext()).size).toEqual(0);
    });

    it('should deploy correctly', async () => {
        // Check all initial values using get methods of the market contract
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(await market.getAmm()).toEqualAddress(ZERO_ADDRESS);
        expect(await market.getJettonWallet()).toEqualAddress(jettonWallet.address);
        expect(await market.getUnderlyingAssetName()).toEqual(underlyingAssetName);
        expect(await market.getDuration()).toEqual(duration);
        expect(await market.getCollectionContent()).toEqualCell(content);
        expect(await market.getOperatorFee()).toEqual(operatorFee);
        expect(await market.getServiceFee()).toEqual(serviceFee);
        expect(await market.getOracle()).toEqualAddress(oracle.address);
        expect(await market.getFeedId()).toEqual(feedId);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress.address);
        expect(await market.getCountDeal()).toEqual(0n);
    });
    describe('positive test', () => {
        it('standard flow - maker long', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0.15'); // 1.5 usd

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(id, rate, percent);
            await proceedDeal(id, rate, duration, secondRate, makerPosition);
        });

        it('standard flow, withdraw fee', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0.15'); // 1.5 usd

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(id, rate, percent);
            await proceedDeal(id, rate, duration, secondRate, makerPosition);
            const feeOwner = await market.getServiceFeeSum();
            const feeOperator = await market.getOperatorFeeSum();
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
            const balanceOwnerBefore = (await jettonWalletOwner.getGetWalletData()).balance;
            const balanceOperatorBefore = (await jettonWalletOperator.getGetWalletData()).balance;

            const withdrawFeeResult = await market.send(
                owner.getSender(),
                {
                    value: toNano('1.5'),
                },
                {
                    $$type: 'WithdrawServiceFee',
                    queryId: 0n,
                    amount: feeOwner,
                    to: owner.address,
                },
            );
            await verifyTransactions(withdrawFeeResult,owner.address);

            const withdrawOperatorFeeResult = await market.send(
                operatorFeeAddress.getSender(),
                {
                    value: toNano('1.5'),
                },
                {
                    $$type: 'WithdrawOperatorFee',
                    queryId: 0n,
                    amount: feeOperator,
                    to: operator.address,
                },
            );
            await verifyTransactions(withdrawOperatorFeeResult,operator.address);
            
            const balanceOperatorAfter = (await jettonWalletOperator.getGetWalletData()).balance;
            const balanceOwnerAfter = (await jettonWalletOwner.getGetWalletData()).balance;
            const balanceMarketAfter = (await jettonWallet.getGetWalletData()).balance;
            expect(balanceOperatorAfter).toEqual(balanceOperatorBefore + feeOperator);
            expect(balanceOwnerAfter).toEqual(balanceOwnerBefore + feeOwner);
            expect(balanceMarketAfter).toEqual(balanceMarketBefore - feeOwner - feeOperator);
        });


        it('standard flow - maker short', async () => {
            const rate = toNano('0.2'); // 2 usd
            const percent = toNano('0.5'); // 50%
            const expiration = 60n * 60n * 24n * 5n; // 5 days
            const slippage = toNano('0.02'); // 2%
            const makerPosition = false;
            
            const secondRate = toNano('0.15'); // 1.5 usd

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(id, rate, percent);
            await proceedDeal(id, rate, duration, secondRate, makerPosition);
        });

        it('standard flow - higher slippage', async () => {
            const rate = toNano('0.05'); // 0.5 usd
            const percent = toNano('0.75'); // 75%
            const expiration = 60n * 60n * 24n * 15n; // 15 days
            const slippage = toNano('0.05'); // 5%
            const makerPosition = true;
            
            const secondRate = toNano('0.04'); // 0.4 usd

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(id, rate, percent);
            await proceedDeal(id, rate, duration, secondRate, makerPosition);
        });

        it('standard flow - price increase', async () => {
            const rate = toNano('0.3'); // 3 usd
            const percent = toNano('0.8'); // 80%
            const expiration = 60n * 60n * 24n * 7n; // 7 days
            const slippage = toNano('0.03'); // 3%
            const makerPosition = true;
            
            const secondRate = toNano('0.4'); // 4 usd

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(id, rate, percent);
            await proceedDeal(id, rate, duration, secondRate, makerPosition);
        });

        it('standard flow - price decrease', async () => {
            const rate = toNano('0.25'); // 2.5 usd
            const percent = toNano('0.6'); // 60%
            const expiration = 60n * 60n * 24n * 3n; // 3 days
            const slippage = toNano('0.015'); // 1.5%
            const makerPosition = false;
            
            const secondRate = toNano('0.2'); // 2 usd

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(id, rate, percent);
            await proceedDeal(id, rate, duration, secondRate, makerPosition);
        });


        it('standard flow - higher percent', async () => {
            const rate = toNano('0.05'); // 0.5 usd
            const percent = toNano('1.75'); // 175%
            const expiration = 60n * 60n * 24n * 15n; // 15 days
            const slippage = toNano('0.05'); // 5%
            const makerPosition = true;
            
            const secondRate = toNano('0.04'); // 0.4 usd

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(id, rate, percent);
            await proceedDeal(id, rate, duration, secondRate, makerPosition);
        });

        it('cancel flow', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await cancelDeal(id, rate, percent, secondRate);
        });

        it('expiration flow', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const id = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await proceedDealAfterExpiration(id, rate, secondRate, expiration);
        });
    });

    describe('negative test for create deal', () => {
        it('return token if bad value', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const createDealData = beginCell()
                .store(
                    storeCreateDeal({
                        $$type: 'CreateDeal',
                        makerPosition: makerPosition,
                        rate: rate,
                        percent: percent,
                        expiration: expiration,
                        slippage: slippage,
                        oracleData: null,
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
                    value: toNano('0.8'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmount(rate, percent, slippage),
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: maker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.07'),
                    forward_payload: createDealData,
                },
            );
            expect(createDealResult.externals.length).toEqual(0);
            await verifyTransactions(createDealResult, maker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return token if small token', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const createDealData = beginCell()
                .store(
                    storeCreateDeal({
                        $$type: 'CreateDeal',
                        makerPosition: makerPosition,
                        rate: rate,
                        percent: percent,
                        expiration: expiration,
                        slippage: slippage,
                        oracleData: null,
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
                    value: toNano('0.8'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmount(rate, percent, slippage) - 1n,
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: maker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.1'),
                    forward_payload: createDealData,
                },
            );
            expect(createDealResult.externals.length).toEqual(0);
            await verifyTransactions(createDealResult, maker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('revert createDeal if call not from wallet', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const createDealData = beginCell()
                .store(
                    storeCreateDeal({
                        $$type: 'CreateDeal',
                        makerPosition: makerPosition,
                        rate: rate,
                        percent: percent,
                        expiration: expiration,
                        slippage: slippage,
                        oracleData: null,
                    }),
                )
                .asSlice();

            const createDealResult = await market.send(
                maker.getSender(),
                {
                    value: toNano('0.8'),
                },
                {
                    $$type: 'TokenNotification',
                    amount: getAmount(rate, percent, slippage) - 1n,
                    query_id: 0n,
                    from: maker.address,
                    forward_payload: createDealData,
                },
            );
            expect(createDealResult.externals.length).toEqual(0);
            expect(createDealResult.transactions).toHaveTransaction({
                to: market.address,
                exitCode: 45223,
            });
        });
    });

    describe('negative test for cancel deal', () => {
        it('revert if call not from maker', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const cancelDealResult = await market.send(
                taker.getSender(),
                {
                    value: toNano('0.8'),
                },
                {
                    $$type: 'CancelDeal',
                    dealId: dealId,
                    queryId: 0n,
                },
            );

            expect(cancelDealResult.externals.length).toEqual(0);
            await verifyTransactions(cancelDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('revert if call with small value', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const cancelDealResult = await market.send(
                maker.getSender(),
                {
                    value: toNano('0.01'),
                },
                {
                    $$type: 'CancelDeal',
                    dealId: dealId,
                    queryId: 0n,
                },
            );
            expect(cancelDealResult.externals.length).toEqual(0);
            expect(cancelDealResult.transactions).toHaveTransaction({
                to: market.address,
                exitCode: 16059,
            });
        });

        it('return if bad id', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = (await createDeal(rate, percent, expiration, slippage, makerPosition)) + 1n;

            const cancelDealResult = await market.send(
                maker.getSender(),
                {
                    value: toNano('0.1'),
                },
                {
                    $$type: 'CancelDeal',
                    dealId: dealId,
                    queryId: 0n,
                },
            );
            expect(cancelDealResult.externals.length).toEqual(0);
            await verifyDeletedDealData(dealId);
        });
    });

    describe('negative test for take deal', () => {
        it('revert if small value', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId,
                                    price: rate,
                                    timestamp: BigInt(Date.now()),
                                    needBounce: false,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletTaker.send(
                taker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent),
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: taker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.07'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            await verifyTransactions(takeDealResult, maker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('revert if send small amount tokens', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId,
                                    price: rate,
                                    timestamp: BigInt(Date.now()),
                                    needBounce: false,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletTaker.send(
                taker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent) - 1n,
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: taker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.8'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            await verifyTransactions(takeDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('revert if bad feed id', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId + 1n,
                                    price: rate,
                                    timestamp: BigInt(Date.now()),
                                    needBounce: false,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletTaker.send(
                taker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent),
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: taker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.8'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            await verifyTransactions(takeDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return token if bad status', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(dealId, rate, percent);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId,
                                    price: rate,
                                    timestamp: BigInt(Date.now()),
                                    needBounce: false,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletTaker.send(
                taker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent),
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: taker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.8'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            await verifyTransactions(takeDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return token if call from maker', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId,
                                    price: rate,
                                    timestamp: BigInt(Date.now()),
                                    needBounce: false,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletMaker.send(
                maker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent),
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: maker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.8'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            await verifyTransactions(takeDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return token if bad timestamp', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId,
                                    price: rate,
                                    timestamp: BigInt(Date.now()) - 60n * 60n * 1000n,
                                    needBounce: false,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletTaker.send(
                taker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent),
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: taker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.8'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            await verifyTransactions(takeDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return token if price out of range', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId,
                                    price: rate * 2n,
                                    timestamp: BigInt(Date.now()),
                                    needBounce: false,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletTaker.send(
                taker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent),
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: taker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.8'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            await verifyTransactions(takeDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return token if bounced oracle', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId,
                                    price: rate,
                                    timestamp: BigInt(Date.now()),
                                    needBounce: true,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletTaker.send(
                taker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent),
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: taker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.8'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            expect(takeDealResult.transactions).toHaveTransaction({
                to: oracle.address,
                exitCode: 41502,
            });
        });

        it('revert if bad dealId', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');
            const dealId = (await createDeal(rate, percent, expiration, slippage, makerPosition)) + 1n;

            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const tonBalanceBefore = await taker.getBalance();
            const takeDealData = beginCell()
                .store(
                    storeTakeDeal({
                        $$type: 'TakeDeal',
                        dealId: dealId,
                        oracleData: beginCell()
                            .store(
                                storeCheckAndReturnPriceForTest({
                                    $$type: 'CheckAndReturnPriceForTest',
                                    feedId: feedId,
                                    price: rate,
                                    timestamp: BigInt(Date.now()),
                                    needBounce: false,
                                }),
                            )
                            .endCell(),
                    }),
                )
                .asSlice();

            const takeDealResult = await jettonWalletTaker.send(
                taker.getSender(),
                {
                    value: toNano('0.9'),
                },
                {
                    $$type: 'TokenTransfer',
                    amount: getAmountWithoutSlippage(rate, percent) - 1n,
                    query_id: 0n,
                    recipient: market.address,
                    response_destination: taker.address,
                    custom_payload: null,
                    forward_ton_amount: toNano('0.8'),
                    forward_payload: takeDealData,
                },
            );
            expect(takeDealResult.externals.length).toEqual(0);
            await verifyDeletedDealData(dealId);
        });
    });

    describe('negative test for process deal', () => {
        it('revert if small value', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(dealId, rate, percent);
            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
            blockchain.now = blockchain.now! + Number(duration);

            const balanceOperatorBefore = await operator.getBalance();
            const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
            const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;

            const proceedDealResult = await market.send(
                operator.getSender(),
                {
                    value: toNano('0.05'),
                },
                {
                    $$type: 'ProcessDeal',
                    dealId,
                    queryId: 0n,
                    oracleData: beginCell()
                        .store(
                            storeCheckAndReturnPriceForTest({
                                $$type: 'CheckAndReturnPriceForTest',
                                feedId: feedId,
                                price: secondRate,
                                timestamp: BigInt(Date.now()) + duration * 1000n,
                                needBounce: false,
                            }),
                        )
                        .endCell(),
                },
            );
            expect(proceedDealResult.externals.length).toEqual(0);
            expect(proceedDealResult.transactions).toHaveTransaction({
                to: market.address,
                exitCode: 16059,
            });
            
           
        });

        it('return if bad timestamp of oracle', async () => {

            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(dealId, rate, percent);
            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
            blockchain.now = blockchain.now! + Number(duration);

            const balanceOperatorBefore = await operator.getBalance();
            const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
            const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;

            const proceedDealResult = await market.send(
                operator.getSender(),
                {
                    value: toNano('1'),
                },
                {
                    $$type: 'ProcessDeal',
                    dealId,
                    queryId: 0n,
                    oracleData: beginCell()
                        .store(
                            storeCheckAndReturnPriceForTest({
                                $$type: 'CheckAndReturnPriceForTest',
                                feedId: feedId,
                                price: secondRate,
                                timestamp: BigInt(Date.now()),
                                needBounce: false,
                            }),
                        )
                        .endCell(),
                },
            );
            expect(proceedDealResult.externals.length).toEqual(0);
            await verifyTransactions(proceedDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return if bad feedId', async () => {

            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(dealId, rate, percent);
            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
            blockchain.now = blockchain.now! + Number(duration);

            const balanceOperatorBefore = await operator.getBalance();
            const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
            const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;

            const proceedDealResult = await market.send(
                operator.getSender(),
                {
                    value: toNano('1'),
                },
                {
                    $$type: 'ProcessDeal',
                    dealId,
                    queryId: 0n,
                    oracleData: beginCell()
                        .store(
                            storeCheckAndReturnPriceForTest({
                                $$type: 'CheckAndReturnPriceForTest',
                                feedId: feedId + 2n,
                                price: secondRate,
                                timestamp: BigInt(Date.now()) + duration * 1000n,
                                needBounce: false,
                            }),
                        )
                        .endCell(),
                },
            );
            expect(proceedDealResult.externals.length).toEqual(0);
            await verifyTransactions(proceedDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return if time is early', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(dealId, rate, percent);
            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
            blockchain.now = blockchain.now! + Number(duration) - 50000;

            const balanceOperatorBefore = await operator.getBalance();
            const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
            const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;
            const proceedDealResult = await market.send(
                operator.getSender(),
                {
                    value: toNano('1'),
                },
                {
                    $$type: 'ProcessDeal',
                    dealId: dealId,
                    queryId: 0n,
                    oracleData: beginCell()
                        .store(
                            storeCheckAndReturnPriceForTest({
                                $$type: 'CheckAndReturnPriceForTest',
                                feedId: feedId ,
                                price: secondRate,
                                timestamp: BigInt(Date.now()) + duration * 1000n,
                                needBounce: false,
                            }),
                        )
                        .endCell(),
                },
            );
            expect(proceedDealResult.externals.length).toEqual(0);
            await verifyTransactions(proceedDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return if bad status', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);
            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

            const balanceOperatorBefore = await operator.getBalance();
            const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
            const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;
            const proceedDealResult = await market.send(
                operator.getSender(),
                {
                    value: toNano('1'),
                },
                {
                    $$type: 'ProcessDeal',
                    dealId: dealId,
                    queryId: 0n,
                    oracleData: beginCell()
                        .store(
                            storeCheckAndReturnPriceForTest({
                                $$type: 'CheckAndReturnPriceForTest',
                                feedId: feedId ,
                                price: secondRate,
                                timestamp: BigInt(Date.now()) + duration * 1000n,
                                needBounce: false,
                            }),
                        )
                        .endCell(),
                },
            );
            expect(proceedDealResult.externals.length).toEqual(0);
            await verifyTransactions(proceedDealResult, taker.address);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });


        it('return if bad dealId', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            let dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(dealId, rate, percent);
            dealId++;
            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
            blockchain.now = blockchain.now! + Number(duration);

            const balanceOperatorBefore = await operator.getBalance();
            const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
            const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;

            const proceedDealResult = await market.send(
                operator.getSender(),
                {
                    value: toNano('1'),
                },
                {
                    $$type: 'ProcessDeal',
                    dealId: dealId,
                    queryId: 0n,
                    oracleData: beginCell()
                        .store(
                            storeCheckAndReturnPriceForTest({
                                $$type: 'CheckAndReturnPriceForTest',
                                feedId: feedId ,
                                price: secondRate,
                                timestamp: BigInt(Date.now()) + duration * 1000n,
                                needBounce: false,
                            }),
                        )
                        .endCell(),
                },
            );
            expect(proceedDealResult.externals.length).toEqual(0);
            await verifyDeletedDealData(dealId);
            await verifyBalancesAfterReturnToken(balanceMakerBefore, balanceTakerBefore, balanceMarketBefore);
        });

        it('return if oracle bounced', async () => {
            const rate = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            
            const secondRate = toNano('0');

            const dealId = await createDeal(rate, percent, expiration, slippage, makerPosition);
            await takeDeal(dealId, rate, percent);
            const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
            const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
            const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
            blockchain.now = blockchain.now! + Number(duration);

            const balanceOperatorBefore = await operator.getBalance();
            const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
            const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;

            const proceedDealResult = await market.send(
                operator.getSender(),
                {
                    value: toNano('1'),
                },
                {
                    $$type: 'ProcessDeal',
                    dealId,
                    queryId: 0n,
                    oracleData: beginCell()
                        .store(
                            storeCheckAndReturnPriceForTest({
                                $$type: 'CheckAndReturnPriceForTest',
                                feedId: feedId,
                                price: secondRate,
                                timestamp: BigInt(Date.now()) + duration * 1000n,
                                needBounce: true,
                            }),
                        )
                        .endCell(),
                },
            );
            expect(proceedDealResult.externals.length).toEqual(0);
            expect(proceedDealResult.transactions).toHaveTransaction({
                to: oracle.address,
                exitCode: 41502,
            });
        });
    });

    async function createDeal(
        rate: bigint,
        percent: bigint,
        expiration: bigint,
        slippage: bigint,
        makerPosition: boolean,
    ): Promise<bigint> {
        const createDealData = beginCell()
            .store(
                storeCreateDeal({
                    $$type: 'CreateDeal',
                    makerPosition: makerPosition,
                    rate: rate,
                    percent: percent,
                    expiration: expiration,
                    slippage: slippage,
                    oracleData: null,
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
                value: toNano('0.9'),
            },
            {
                $$type: 'TokenTransfer',
                amount: getAmount(rate, percent, slippage),
                query_id: 0n,
                recipient: market.address,
                response_destination: maker.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.8'),
                forward_payload: createDealData,
            },
        );
        const { dealId } = loadDealCreatedEvent(createDealResult.externals[0].body.beginParse());
        const tonBalanceAfter = await maker.getBalance();
        console.log('User fee :' + fromNano(tonBalanceAfter - tonBalanceBefore));

        deal = blockchain.openContract(await Deal.fromInit(dealId, market.address));

        await verifyDeal(createDealResult, 'create', {
            balanceMakerBefore,
            balanceTakerBefore,
            balanceMarketBefore,
            rate,
            percent,
            slippage,
            makerPosition,
            expiration,
            dealId,
        });
        return dealId;
    }

    async function takeDeal(dealId: bigint, rate: bigint, percent: bigint) {
        const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

        const tonBalanceBefore = await taker.getBalance();
        const takeDealData = beginCell()
            .store(
                storeTakeDeal({
                    $$type: 'TakeDeal',
                    dealId: dealId,
                    oracleData: beginCell()
                        .store(
                            storeCheckAndReturnPriceForTest({
                                $$type: 'CheckAndReturnPriceForTest',
                                feedId: feedId,
                                price: rate,
                                timestamp: BigInt(Date.now()),
                                needBounce: false,
                            }),
                        )
                        .endCell(),
                }),
            )
            .asSlice();

        const takeDealResult = await jettonWalletTaker.send(
            taker.getSender(),
            {
                value: toNano('0.9'),
            },
            {
                $$type: 'TokenTransfer',
                amount: getAmountWithoutSlippage(rate, percent),
                query_id: 0n,
                recipient: market.address,
                response_destination: taker.address,
                custom_payload: null,
                forward_ton_amount: toNano('0.8'),
                forward_payload: takeDealData,
            },
        );
        const tonBalanceAfter = await taker.getBalance();
        console.log('User fee :' + fromNano(tonBalanceAfter - tonBalanceBefore));

        await verifyDeal(takeDealResult, 'take', {
            balanceMakerBefore,
            balanceTakerBefore,
            balanceMarketBefore,
            rate,
            percent,
            dealId,
        });
    }

    async function proceedDeal(dealId: bigint, rate: bigint, duration: bigint, secondRate: bigint, makerPosition: boolean) {
        const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
        blockchain.now = blockchain.now! + Number(duration);

        const balanceOperatorBefore = await operator.getBalance();
        const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
        const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;

        const proceedDealResult = await market.send(
            operator.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'ProcessDeal',
                dealId,
                queryId: 0n,
                oracleData: beginCell()
                    .store(
                        storeCheckAndReturnPriceForTest({
                            $$type: 'CheckAndReturnPriceForTest',
                            feedId: feedId,
                            price: secondRate,
                            timestamp: BigInt(Date.now()) + duration * 1000n,
                            needBounce: false,
                        }),
                    )
                    .endCell(),
            },
        );

        const balanceOperatorAfter = await operator.getBalance();

        console.log('User fee :' + fromNano(balanceOperatorAfter - balanceOperatorBefore));
        await verifyDeal(proceedDealResult, 'proceed', {
            balanceMakerBefore,
            balanceTakerBefore,
            balanceMarketBefore,
            rate,
            secondRate,
            dealId,
            collateralAmountMaker,
            makerPosition,
            isSeller: !makerPosition,
        });
    }

    async function proceedDealAfterExpiration(dealId: bigint, rate: bigint, secondRate: bigint, expiration: bigint) {
        const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;
        blockchain.now = blockchain.now! + Number(expiration);

        const balanceOperatorBefore = await operator.getBalance();
        const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
        const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;

        const proceedDealResult = await market.send(
            operator.getSender(),
            {
                value: toNano('1'),
            },
            {
                $$type: 'ProcessDeal',
                dealId,
                queryId: 0n,
                oracleData: beginCell()
                    .store(
                        storeCheckAndReturnPriceForTest({
                            $$type: 'CheckAndReturnPriceForTest',
                            feedId: feedId,
                            price: secondRate,
                            timestamp: BigInt(Date.now()) + duration * 1000n,
                            needBounce: false,
                        }),
                    )
                    .endCell(),
            },
        );

        const balanceOperatorAfter = await operator.getBalance();

        console.log('User fee :' + fromNano(balanceOperatorAfter - balanceOperatorBefore));
        await verifyTransactions(proceedDealResult, operator.address);
        await verifyBalancesAfterCancelDeal(
            balanceMakerBefore,
            balanceTakerBefore,
            balanceMarketBefore,
            collateralAmountMaker,
        );
        await verifyDeletedDealData(dealId);
    }
    async function cancelDeal(dealId: bigint, rate: bigint, percent: bigint, slippage: bigint) {
        const balanceMakerBefore = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerBefore = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketBefore = (await jettonWallet.getGetWalletData()).balance;

        const tonBalanceBefore = await maker.getBalance();
        const dealData = loadDealData((await deal.getData())!.asSlice());
        const collateralAmountMaker = dealData.collateralAmountMaker!;
        const cancelDealResult = await market.send(
            maker.getSender(),
            {
                value: toNano('1.5'),
            },
            {
                $$type: 'CancelDeal',
                dealId: dealId,
                queryId: 0n,
            },
        );

        const tonBalanceAfter = await maker.getBalance();

        console.log('User fee :' + fromNano(tonBalanceAfter - tonBalanceBefore));
        await verifyDeal(cancelDealResult, 'cancel', {
            balanceMakerBefore,
            balanceTakerBefore,
            balanceMarketBefore,
            rate,
            percent,
            slippage,
            collateralAmountMaker,
            dealId,
        });
    }

    async function verifyDeal(result: any, stage: 'create' | 'take' | 'proceed' | 'cancel', params: any) {
        if (stage === 'create') {
            await verifyTransactions(result, maker.address);
            marketBalance = await market.getBalance();
            expect(marketBalance).toEqual(toNano('0.1'));
            await verifyBalancesAfterCreateDeal(
                params.balanceMakerBefore,
                params.balanceTakerBefore,
                params.balanceMarketBefore,
                params.rate,
                params.percent,
                params.slippage,
            );
            await verifyDealDataAfterCreate(
                params.dealId,
                params.rate,
                params.percent,
                params.slippage,
                params.makerPosition,
                params.expiration,
            );
        } else if (stage === 'take') {
            await verifyTransactions(result, taker.address);
            marketBalance = await market.getBalance();
            expect(marketBalance).toEqual(toNano('0.1'));
            await verifyDealDataAfterTake(params.dealId, params.rate, params.percent);
            await verifyBalancesAfterTakeDeal(
                params.balanceMakerBefore,
                params.balanceTakerBefore,
                params.balanceMarketBefore,
                params.rate,
                params.percent,
            );
        } else if (stage === 'proceed') {
            await verifyTransactions(result, operator.address);
            await verifyBalancesAfterProceedDeal(
                params.balanceMakerBefore,
                params.balanceTakerBefore,
                params.balanceMarketBefore,
                params.collateralAmountMaker,
                params.rate,
                params.secondRate,
                params.isSeller,
            );
            await verifyDeletedDealData(params.dealId);
        } else if (stage === 'cancel') {
            await verifyTransactions(result, maker.address);
            await verifyBalancesAfterCancelDeal(
                params.balanceMakerBefore,
                params.balanceTakerBefore,
                params.balanceMarketBefore,
                params.collateralAmountMaker,
            );
            await verifyDeletedDealData(params.dealId);
        }
    }

    async function verifyDealDataAfterCreate(
        dealId: bigint,
        rate: bigint,
        percent: bigint,
        slippage: bigint,
        makerPosition: boolean,
        expiration: bigint,
    ) {
        let deal = await blockchain.openContract(await Deal.fromInit(dealId, market.address));
        const dealData = loadDealData((await deal.getData())!.asSlice());
        expect(dealData.collateralAmountMaker).toEqual(getAmount(rate, percent, slippage));
        expect(dealData.rateMaker).toEqual(rate);
        expect(dealData.maker!.toString()).toEqual(maker.address.toString());
        expect(dealData.percent).toEqual(percent);
        expect(dealData.slippageMaker).toEqual(slippage);
        expect(dealData.status).toEqual(DEAL_STATUS_CREATED);
        expect(dealData.rate).toEqual(0n);
        expect(dealData.buyerTokenId).toEqual(0n);
        expect(dealData.sellerTokenId).toEqual(0n);
        expect(dealData.dateStart).toEqual(0n);
        expect(dealData.dateStop).toEqual(0n);
        expect(dealData.isSeller).toEqual(!makerPosition);
        expect(dealData.dateOrderExpiration! - dealData.dateOrderCreation!).toEqual(expiration);
    }

    async function verifyDealDataAfterTake(dealId: bigint, rate: bigint, percent: bigint) {
        let deal = await blockchain.openContract(await Deal.fromInit(dealId, market.address));
        const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
        expect(dealDataAfterTake.collateralAmountMaker).toEqual(getAmountWithoutSlippage(rate, percent));
        expect(dealDataAfterTake.rateMaker).toEqual(rate);
        expect(dealDataAfterTake.maker!.toString()).toEqual(maker.address.toString());
        expect(dealDataAfterTake.percent).toEqual(percent);
        expect(dealDataAfterTake.status).toEqual(DEAL_STATUS_ACCEPTED);
        expect(dealDataAfterTake.rate).toEqual(rate);
        expect(dealDataAfterTake.buyerTokenId).not.toEqual(dealDataAfterTake.sellerTokenId);
        expect(dealDataAfterTake.dateStop! - dealDataAfterTake.dateStart!).toEqual(duration);
    }

    async function verifyDeletedDealData(dealId: bigint) {
        let deal = await blockchain.openContract(await Deal.fromInit(dealId, market.address));
        let hasError = false;
        try {
            console.log(await deal.getData());
        } catch (error) {
            hasError = true;
        }
        expect(hasError).toEqual(true);
    }

    async function verifyBalancesAfterCreateDeal(
        balanceMakerBefore: bigint,
        balanceTakerBefore: bigint,
        balanceMarketBefore: bigint,
        rate: bigint,
        percent: bigint,
        slippage: bigint,
    ) {
        const balanceMakerAfter = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerAfter = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketAfter = (await jettonWallet.getGetWalletData()).balance;

        expect(balanceMakerAfter).toEqual(balanceMakerBefore - getAmount(rate, percent, slippage));
        expect(balanceTakerAfter).toEqual(balanceTakerBefore);
        expect(balanceMarketAfter).toEqual(balanceMarketBefore + getAmount(rate, percent, slippage));
    }
    async function verifyBalancesAfterTakeDeal(
        balanceMakerBefore: bigint,
        balanceTakerBefore: bigint,
        balanceMarketBefore: bigint,
        rate: bigint,
        percent: bigint,
    ) {
        const balanceMakerAfter = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerAfter = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketAfter = (await jettonWallet.getGetWalletData()).balance;

        const dealData = loadDealData((await deal.getData())!.asSlice());
        const slippage = dealData.slippageMaker;

        expect(balanceMakerAfter).toEqual(
            balanceMakerBefore + (getAmount(rate, percent, slippage) - getAmountWithoutSlippage(rate, percent)),
        );
        expect(balanceTakerAfter).toEqual(balanceTakerBefore - getAmountWithoutSlippage(rate, percent));
        expect(balanceMarketAfter).toEqual(
            balanceMarketBefore +
                getAmountWithoutSlippage(rate, percent) -
                (getAmount(rate, percent, slippage) - getAmountWithoutSlippage(rate, percent)),
        );
    }

    async function verifyBalancesAfterProceedDeal(
        balanceMakerBefore: bigint,
        balanceTakerBefore: bigint,
        balanceMarketBefore: bigint,
        collateralAmountMaker: bigint,
        rate: bigint,
        secondRate: bigint,
        isSeller: boolean,
    ) {
        const balanceMakerAfter = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerAfter = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketAfter = (await jettonWallet.getGetWalletData()).balance;
        if (isSeller) {
            let t = rate;
            rate = secondRate;
            secondRate = t;
        }

        if (BigInt(Math.abs(Number(rate - secondRate))) > collateralAmountMaker) {
            const rateDifference = secondRate - rate > 0 ? collateralAmountMaker : -collateralAmountMaker;
            const absoluteRateDifference = BigInt(Math.abs(Number(rateDifference)));
            const feePercentage = toNano('1') - serviceFee - operatorFee;
            const feeAmount = (absoluteRateDifference * (serviceFee + operatorFee)) / toNano('1');

            let makerProfit = rateDifference > 0 ? (rateDifference * feePercentage) / toNano('1') : rateDifference;
            let takerProfit = -(rateDifference < 0 ? (rateDifference * feePercentage) / toNano('1') : rateDifference);

            console.log(makerProfit, takerProfit, feeAmount);
            expect(balanceMakerAfter).toEqual(balanceMakerBefore + makerProfit + collateralAmountMaker);
            expect(balanceTakerAfter).toEqual(balanceTakerBefore + takerProfit + collateralAmountMaker);
            expect(balanceMarketAfter).toEqual(balanceMarketBefore - collateralAmountMaker * 2n + feeAmount);
        } else {
            const rateDifference = secondRate - rate;
            const absoluteRateDifference = BigInt(Math.abs(Number(rateDifference)));
            const feePercentage = toNano('1') - serviceFee - operatorFee;
            const feeAmount = (absoluteRateDifference * (serviceFee + operatorFee)) / toNano('1');

            let makerProfit = rateDifference > 0 ? (rateDifference * feePercentage) / toNano('1') : rateDifference;
            let takerProfit = -(rateDifference < 0 ? (rateDifference * feePercentage) / toNano('1') : rateDifference);
            expect(balanceMakerAfter).toEqual(balanceMakerBefore + makerProfit + collateralAmountMaker);

            expect(balanceTakerAfter).toEqual(balanceTakerBefore + takerProfit + collateralAmountMaker);

            expect(balanceMarketAfter).toEqual(balanceMarketBefore - collateralAmountMaker * 2n + feeAmount);
        }
    }

    async function verifyBalancesAfterCancelDeal(
        balanceMakerBefore: bigint,
        balanceTakerBefore: bigint,
        balanceMarketBefore: bigint,
        collateralAmountMaker: bigint,
    ) {
        const balanceMakerAfter = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerAfter = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketAfter = (await jettonWallet.getGetWalletData()).balance;
        expect(balanceMakerAfter).toEqual(balanceMakerBefore + collateralAmountMaker);
        expect(balanceTakerAfter).toEqual(balanceTakerBefore);
        expect(balanceMarketAfter).toEqual(balanceMarketBefore - collateralAmountMaker);
    }
    async function verifyBalancesAfterReturnToken(
        balanceMakerBefore: bigint,
        balanceTakerBefore: bigint,
        balanceMarketBefore: bigint,
    ) {
        const balanceMakerAfter = (await jettonWalletMaker.getGetWalletData()).balance;
        const balanceTakerAfter = (await jettonWalletTaker.getGetWalletData()).balance;
        const balanceMarketAfter = (await jettonWallet.getGetWalletData()).balance;
        expect(balanceMakerAfter).toEqual(balanceMakerBefore);
        expect(balanceTakerAfter).toEqual(balanceTakerBefore);
        expect(balanceMarketAfter).toEqual(balanceMarketBefore);
    }

    async function verifyTransactions(result: any, fromAddress: Address) {
        expect(result.transactions).not.toHaveTransaction({
            success: false,
            to: (a?: Address) => a?.toString() !== fromAddress.toString(),
        });
    }
});
