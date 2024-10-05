import { compile } from '@ton/blueprint';
import { Cell, toNano } from '@ton/core';
import '@ton/test-utils';
import { SampleConsumerInitData } from '../src/sample-consumer/SampleConsumerInitData';
import { TonSampleConsumerContractAdapter } from '../src/sample-consumer/TonSampleConsumerContractAdapter';
import { SingleFeedManInitData } from '../src/single-feed-man/SingleFeedManInitData';
import { TonSingleFeedManContractAdapter } from '../src/single-feed-man/TonSingleFeedManContractAdapter';
import { TonSingleFeedManContractDeployer } from '../src/single-feed-man/TonSingleFeedManContractDeployer';
import { toBigInt } from '../src/ton-utils';
import { createTestNetwork } from './helpers/sandbox_helpers';
import {
    SIGNERS,
    createCellFromParamsProvider,
    expectUsdtPrice,
    getContractParamsProvider,
    waitForNewData,
} from './helpers/test_helpers';
import { CheckTactOracle } from '../wrappers/CheckTactOracle';
import { SandboxContract, TreasuryContract } from '@ton/sandbox';
import { ContractParamsProvider } from '@redstone-finance/sdk';


describe('Ton Single Feed Man Tests', () => {
    let singleFeedManCode: Cell;
    let sampleConsumerCode: Cell;
    let singleFeedMan: TonSingleFeedManContractAdapter;
    let sampleConsumer: TonSampleConsumerContractAdapter;
    let owner: SandboxContract<TreasuryContract>;
    let checker: SandboxContract<CheckTactOracle>;

    beforeAll(async () => {
        singleFeedManCode = await compile('single_feed_man', {});
    });

    beforeEach(async () => {
        const network = await createTestNetwork();

        singleFeedMan = await new TonSingleFeedManContractDeployer(
            network,
            singleFeedManCode,
            new SingleFeedManInitData('USDT', 2, SIGNERS),
        ).getAdapter();
        const blockchain = network.getBlockchain();
        owner = await blockchain.treasury('owner');

        checker = await blockchain.openContract(await CheckTactOracle.fromInit(1n, singleFeedMan.contract.address));
        await checker.send(
            owner.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Deploy',
                queryId: 1n,
            },
        );
    });

    it('should deploy & not set any initial data', async () => {
        const { price, timestamp } = await singleFeedMan.readPriceAndTimestampFromContract();
        expect(price).toBe(0n);
        expect(timestamp).toBe(0);
    });

    it('should get price', async () => {
        const paramsProvider = getContractParamsProvider();
        const { price, timestamp } = await singleFeedMan.getPriceFromPayload(paramsProvider);
        expect(timestamp).toBeGreaterThan(0);
        expectUsdtPrice(price);
    });

    // it('should write prices twice', async () => {
    //     const { price, timestamp } = await writeAndReadPriceAndTimestamp(['USDT', 'ETH']);
    //     expect(timestamp).toBeGreaterThan(0);
    //     expectUsdtPrice(price);
    //     await waitForNewData();
    //     const { price: price2, timestamp: timestamp2 } = await writeAndReadPriceAndTimestamp();
    //     expect(timestamp2).not.toBe(timestamp);
    //     expect(price2).not.toBe(price);
    // });

    it('should work with consumer', async () => {
        const queryTimestamp = Date.now() - Date.now() % 100000 - 100000*6*60*24;
        const queryId = 2134n;
        
        const res = await checker.send(
            owner.getSender(),
            {
                value: toNano('0.2'),
            },
            {
                $$type: 'SetPrice',
                queryId,
                data: await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 2,
                        dataPackagesIds: ['USDT'],
                        historicalTimestamp: queryTimestamp,
                    }),
                ),
            },
        );

        console.log(res.events);

        const feedId = (await checker.getFeedId());
        const price = (await checker.getPrice());
        const timestamp = (await checker.getTimestamp());
        const gottenQueryId = (await checker.getQueryId());
        console.log(feedId);
        console.log(price);
        console.log(timestamp);
        console.log(gottenQueryId);
        expectUsdtPrice((price!));
        expect(gottenQueryId!.toString()).toEqual(queryId.toString());
        expect((timestamp!).toString()).toEqual(queryTimestamp.toString());
    });


    it('should not work with bad feedId', async () => {
        await checker.send(
            owner.getSender(),
            {
                value: toNano('0.3'),
            },
            {
                $$type: 'SetPrice',
                queryId: 1n,
                data: await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 2,
                        dataPackagesIds: ['ETH'],
                        historicalTimestamp: 1725272800000,
                    }),
                ),
            },
        );

        // console.log(res.events);

        const feedId = (await checker.getFeedId());
        const price = (await checker.getPrice());
        const timestamp = (await checker.getTimestamp());

        // expectUsdtPrice((price!));
        expect(feedId).toEqual(null);
        expect(price).toEqual(null);
        expect(timestamp).toEqual(null);
    });




    it('should not work with small count signature', async () => {
        await checker.send(
            owner.getSender(),
            {
                value: toNano('0.3'),
            },
            {
                $$type: 'SetPrice',
                queryId: 1n,
                data: await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 1,
                        dataPackagesIds: ['USDT'],
                    }),
                ),
            },
        );


        const feedId = (await checker.getFeedId());
        const price = (await checker.getPrice());
        const timestamp = (await checker.getTimestamp());

        console.log(feedId);

        expect(feedId).toEqual(null);
        expect(price).toEqual(null);
        expect(timestamp).toEqual(null);
    });

    async function writeAndReadPriceAndTimestamp(dataFeeds: string[] = ['USDT', 'BTC', 'AVAX', 'ETH']) {
        const paramsProvider = getContractParamsProvider(dataFeeds);
        await singleFeedMan.writePriceFromPayloadToContract(paramsProvider);
        const { price, timestamp } = await singleFeedMan.readPriceAndTimestampFromContract();

        return { price, timestamp, paramsProvider };
    }
});
