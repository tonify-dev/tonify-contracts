import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, Cell, fromNano, toNano } from '@ton/core';
import { loadDealCreatedEvent, loadDealData, Market, storeCreateDeal, storeTakeDeal } from '../wrappers/Market';
import '@ton/test-utils';
import { MyJetton } from '../wrappers/MyJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { OracleMock, storeCheckAndReturnPrice, storeCheckAndReturnPriceForTest } from '../wrappers/OracleMock';
import { Deal } from '../wrappers/Deal';
import { createTestNetwork } from './helpers/sandbox_helpers';
import { TonSingleFeedManContractAdapter } from '../src/single-feed-man/TonSingleFeedManContractAdapter';
import { TonSingleFeedManContractDeployer } from '../src/single-feed-man/TonSingleFeedManContractDeployer';
import { SingleFeedManInitData } from '../src/single-feed-man/SingleFeedManInitData';
import { createCellFromParamsProvider, SIGNERS } from './helpers/test_helpers';
import { compile } from '@ton/blueprint';
import { ContractParamsProvider, fetchDataPackages } from '@redstone-finance/sdk';
import { hexlify, toUtf8Bytes } from 'ethers/lib/utils';
import { MarketTon } from '../wrappers/MarketTon';

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
    let oracle: SandboxContract<OracleMock>;
    let maker: SandboxContract<TreasuryContract>;
    let taker: SandboxContract<TreasuryContract>;
    let factory: SandboxContract<TreasuryContract>;
    let market: SandboxContract<MarketTon>;
    let deal: SandboxContract<Deal>;
    let marketBalance: bigint;
    let singleFeedMan: TonSingleFeedManContractAdapter;
    let singleFeedManCode: Cell;
    const feedIdAsset = BigInt(hexlify(toUtf8Bytes('USDT')));
    const feedIdToken = BigInt(hexlify(toUtf8Bytes('USDC')));
    const serviceFee = toNano('0.01'); // 1%
    const operatorFee = toNano('0.01'); // 1%
    const content = beginCell().endCell();
    const duration = 60n * 60n * 24n * 1n; // 1 day
    const underlyingAssetName = 'USDT';
    const ZERO_ADDRESS = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');
    const SLIPPAGE_DENOMINATOR = 10n ** 25n;
    const COLLATERAL_DENOMINATOR = 10n ** 16n;

    function getAmount(rateAsset: bigint, rateToken: bigint, percent: bigint, slippage: bigint): bigint {
        return (
            (rateAsset * percent * rateToken) / COLLATERAL_DENOMINATOR +
            (rateAsset * percent * slippage * rateToken) / SLIPPAGE_DENOMINATOR
        );
    }

    beforeAll(async () => {
        singleFeedManCode = await compile('single_feed_man', {});
    });
    beforeEach(async () => {
        const network = await createTestNetwork(Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 5);
        blockchain = network.getBlockchain();

        singleFeedMan = await new TonSingleFeedManContractDeployer(
            network,
            singleFeedManCode,
            new SingleFeedManInitData('USDT', 2, SIGNERS),
        ).getAdapter();
        deployer = await blockchain.treasury('deployer');
        owner = await blockchain.treasury('owner');
        operatorFeeAddress = await blockchain.treasury('operatorFeeAddress');
        serviceFeeAddress = await blockchain.treasury('serviceFeeAddress');
        amm = await blockchain.treasury('amm');
        taker = await blockchain.treasury('taker');
        maker = await blockchain.treasury('maker');
        factory = await blockchain.treasury('factory');
        operator = await blockchain.treasury('operator');

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
                ZERO_ADDRESS,
                factory.address,
                underlyingAssetName,
                duration,
                content,
                operatorFee,
                serviceFee,
                singleFeedMan.contract.address,
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
    });

    afterEach(async () => {
        expect((await market.getMapQueriesToContext()).size).toEqual(0);
        marketBalance = await market.getBalance();
        expect(Number.parseFloat(fromNano(marketBalance))).toBeGreaterThanOrEqual(0.09);
    });

    it('should deploy correctly', async () => {
        // Check all initial values using get methods of the market contract
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(await market.getAmm()).toEqualAddress(ZERO_ADDRESS);
        expect(await market.getUnderlyingAssetName()).toEqual(underlyingAssetName);
        expect(await market.getDuration()).toEqual(duration);
        expect(await market.getCollectionContent()).toEqualCell(content);
        expect(await market.getOperatorFee()).toEqual(operatorFee);
        expect(await market.getServiceFee()).toEqual(serviceFee);
        expect(await market.getOracle()).toEqualAddress(singleFeedMan.contract.address);
        expect(await market.getFeedIdAsset()).toEqual(feedIdAsset);
        expect(await market.getFeedIdToken()).toEqual(feedIdToken);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress.address);
        expect(await market.getCountDeal()).toEqual(0n);
    });
    describe('positive test', () => {
        it('standard flow - maker long', async () => {
            const rateAsset = toNano('0.1'); // 1 usd
            const rateToken = toNano('0.1'); // 1 usd
            const percent = toNano('1'); // 100%
            const expiration = 60n * 60n * 24n * 10n; // 10 days
            const slippage = toNano('0.01'); // 1%
            const makerPosition = true;
            await createDeal(rateAsset, rateToken, percent, expiration, slippage, makerPosition);
            const secondRateAsset = toNano('0.15'); // 1.5 usd

            const id = await createDeal(rateAsset, rateToken, percent, expiration, slippage, makerPosition);
            await takeDeal(id, rateAsset, rateToken, percent, slippage);
            await proceedDeal(id, rateAsset, rateToken, duration, secondRateAsset, makerPosition);
        });
    });

    async function createDeal(
        rateAsset: bigint,
        rateToken: bigint,
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
                    rateAsset: rateAsset,
                    rateToken: rateToken,
                    percent: percent,
                    expiration: expiration,
                    slippage: slippage,
                    oracleAssetData: null,
                    oracleTokenData: null,
                }),
            )
            .asSlice();

        const balanceMakerBefore = await maker.getBalance();
        const balanceTakerBefore = await taker.getBalance();
        const balanceMarketBefore = await market.getBalance();
        const tonBalanceBefore = await maker.getBalance();
        const amount = getAmount(rateAsset, rateToken, percent, slippage);
        const createDealResult = await market.send(
            maker.getSender(),
            {
                value: toNano('0.05') + amount,
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
                    oracleAssetData: null,
                    oracleTokenData: null,
                },
                queryId: 0n,
            },
        );

        const { dealId } = loadDealCreatedEvent(createDealResult.externals[0].body.beginParse());
        const tonBalanceAfter = await maker.getBalance();
        console.log('User fee :' + fromNano(tonBalanceAfter - tonBalanceBefore + amount));
        deal = blockchain.openContract(await Deal.fromInit(dealId, market.address));

        await verifyDeal(createDealResult, 'create', {
            balanceMakerBefore,
            balanceTakerBefore,
            balanceMarketBefore,
            rateAsset,
            rateToken,
            percent,
            slippage,
            makerPosition,
            expiration,
            dealId,
        });
        return dealId;
    }

    async function takeDeal(dealId: bigint, rateAsset: bigint, rateToken: bigint, percent: bigint, slippage: bigint) {
        const balanceMakerBefore = await maker.getBalance();
        const balanceTakerBefore = await taker.getBalance();
        const balanceMarketBefore = await market.getBalance();

        const tonBalanceBefore = await taker.getBalance();

        const amount = getAmount(rateAsset, rateToken, percent, slippage);
        const takeDealResult = await market.send(
            taker.getSender(),
            {
                value: toNano('0.25') + amount,
            },
            {
                $$type: 'TakeDealTon',
                queryId: 0n,
                deal: {
                    $$type: 'TakeDealData',
                    dealId: dealId,
                    oracleAssetData: await createCellFromParamsProvider(
                        new ContractParamsProvider({
                            dataServiceId: 'redstone-avalanche-prod',
                            uniqueSignersCount: 2,
                            dataPackagesIds: ['USDT'],
                            historicalTimestamp: Math.floor((blockchain.now! * 1000) / 10000) * 10000,
                        }),
                    ),
                    oracleTokenData: await createCellFromParamsProvider(
                        new ContractParamsProvider({
                            dataServiceId: 'redstone-avalanche-prod',
                            uniqueSignersCount: 2,
                            dataPackagesIds: ['USDC'],
                            historicalTimestamp: Math.floor((blockchain.now! * 1000) / 10000) * 10000,
                        }),
                    ),
                },
            },
        );
        // console.log('takeDealResult', takeDealResult.transactions);
        // console.log('takeDealResult', takeDealResult.events);
        const tonBalanceAfter = await taker.getBalance();
        console.log('User fee :' + fromNano(tonBalanceAfter - tonBalanceBefore + amount));
        await verifyDeal(takeDealResult, 'take', {
            balanceMakerBefore,
            balanceTakerBefore,
            balanceMarketBefore,
            rateAsset,
            rateToken,
            percent,
            dealId,
        });
        // console.log('takeDealResult', takeDealResult.events);
    }

    async function proceedDeal(
        dealId: bigint,
        rateAsset: bigint,
        rateToken: bigint,
        duration: bigint,
        secondRateAsset: bigint,
        makerPosition: boolean,
    ) {
        const balanceMakerBefore = await maker.getBalance();
        const balanceTakerBefore = await taker.getBalance();
        const balanceMarketBefore = await market.getBalance();
        blockchain.now = blockchain.now! + Number(duration);

        const balanceOperatorBefore = await operator.getBalance();
        const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
        const collateralAmountMaker = dealDataAfterTake.collateralAmountMaker!;
        const dateStop = dealDataAfterTake.dateStop!;

        const proceedDealResult = await market.send(
            operator.getSender(),
            {
                value: toNano('0.25'),
            },
            {
                $$type: 'ProcessDeal',
                dealId,
                queryId: 0n,
                oracleAssetData: await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 2,
                        dataPackagesIds: ['USDT'],
                        historicalTimestamp: Number((dateStop / 10n) * 1000n * 10n),
                    }),
                ),
                oracleTokenData: await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 2,
                        dataPackagesIds: ['USDC'],
                        historicalTimestamp: Number((dateStop / 10n) * 1000n * 10n),
                    }),
                ),
            },
        );
        // console.log('proceedDealResult', proceedDealResult.transactions);
        // console.log('proceedDealResult', proceedDealResult.events);

        const balanceOperatorAfter = await operator.getBalance();

        console.log('User fee :' + fromNano(balanceOperatorAfter - balanceOperatorBefore));
        await verifyDeal(proceedDealResult, 'proceed', {
            balanceMakerBefore,
            balanceTakerBefore,
            balanceMarketBefore,
            rateAsset,
            rateToken,
            secondRateAsset,
            dealId,
            collateralAmountMaker,
            makerPosition,
            isSeller: !makerPosition,
        });
    }

    async function verifyDeal(result: any, stage: 'create' | 'take' | 'proceed' | 'cancel', params: any) {
        if (stage === 'create') {
            await verifyTransactions(result, maker.address);
            marketBalance = await market.getBalance();
            const marketTotalDeposited = await market.getTonDepositBalance();
            expect(marketBalance).toEqual(toNano('0.1') + marketTotalDeposited);
            await verifyBalancesAfterCreateDeal(
                params.balanceMakerBefore,
                params.balanceTakerBefore,
                params.balanceMarketBefore,
                params.rateAsset,
                params.rateToken,
                params.percent,
                params.slippage,
            );
            await verifyDealDataAfterCreate(
                params.dealId,
                params.rateAsset,
                params.rateToken,
                params.percent,
                params.slippage,
                params.makerPosition,
                params.expiration,
            );
        } else if (stage === 'take') {
            await verifyTransactions(result, taker.address);
            await verifyDealDataAfterTake(params.dealId, params.rateAsset, params.rateToken, params.percent);
        } else if (stage === 'proceed') {
            await verifyTransactions(result, operator.address);
            await verifyDeletedDealData(params.dealId);
        } else if (stage === 'cancel') {
            await verifyTransactions(result, maker.address);
            await verifyDeletedDealData(params.dealId);
        }
    }

    async function verifyDealDataAfterCreate(
        dealId: bigint,
        rateAsset: bigint,
        rateToken: bigint,
        percent: bigint,
        slippage: bigint,
        makerPosition: boolean,
        expiration: bigint,
    ) {
        let deal = await blockchain.openContract(await Deal.fromInit(dealId, market.address));
        const dealData = loadDealData((await deal.getData())!.asSlice());
        expect(dealData.collateralAmountMaker).toEqual(getAmount(rateAsset, rateToken, percent, slippage));
        expect(dealData.rateMaker).toEqual(rateAsset);
        expect(dealData.maker!.toString()).toEqual(maker.address.toString());
        expect(dealData.percent).toEqual(percent);
        expect(dealData.slippageMaker).toEqual(slippage);
        expect(dealData.status).toEqual(DEAL_STATUS_CREATED);
        expect(dealData.rate).toEqual(0n);
        expect(dealData.buyerTokenId).toEqual(0n);
        expect(dealData.sellerTokenId).toEqual(0n);
        // expect(dealData.dateStart).toEqual(0n);
        expect(dealData.dateStop).toEqual(0n);
        expect(dealData.isSeller).toEqual(!makerPosition);
        // expect(dealData.dateOrderExpiration! - dealData.dateOrderCreation!).toEqual(expiration);
    }

    async function verifyDealDataAfterTake(dealId: bigint, rateAsset: bigint, rateToken: bigint, percent: bigint) {
        let deal = await blockchain.openContract(await Deal.fromInit(dealId, market.address));
        const dealDataAfterTake = loadDealData((await deal.getData())!.asSlice());
        expect(dealDataAfterTake.status).toEqual(DEAL_STATUS_ACCEPTED);
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
        rateAsset: bigint,
        rateToken: bigint,
        percent: bigint,
        slippage: bigint,
    ) {
        const balanceMakerAfter = await maker.getBalance();
        const balanceTakerAfter = await taker.getBalance();
        const balanceMarketAfter = await market.getBalance();

        expect(balanceMakerAfter).toBeLessThanOrEqual(
            balanceMakerBefore - getAmount(rateAsset, rateToken, percent, slippage),
        );
        expect(balanceTakerAfter).toEqual(balanceTakerBefore);
        expect(balanceMarketAfter).toEqual(balanceMarketBefore + getAmount(rateAsset, rateToken, percent, slippage));
    }

    async function verifyTransactions(result: any, fromAddress: Address) {
        expect(result.transactions).not.toHaveTransaction({
            success: false,
            to: (a?: Address) => a?.toString() !== fromAddress.toString(),
        });
    }
});
