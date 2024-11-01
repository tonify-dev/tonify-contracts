import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, Address, Cell, beginCell } from '@ton/core';
import {
    Factory,
    loadMarketDeployedEvent,
    loadMarketDeployedEventWithAmm,
    loadMarketTonDeployedEvent,
    loadMarketTonDeployedEventWithAmm,
} from '../wrappers/Factory';
import '@ton/test-utils';
import { Market } from '../wrappers/Market';

describe('Factory', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let factory: SandboxContract<Factory>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        factory = blockchain.openContract(await Factory.fromInit(0n));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await factory.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: factory.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and factory are ready to use
    });

    it('should deploy a new market', async () => {
        const sender = await blockchain.treasury('sender');
        const owner = await blockchain.treasury('owner');
        const coin = await blockchain.treasury('coin');
        const amm = await blockchain.treasury('amm');
        const jettonWallet = await blockchain.treasury('jettonWallet');
        const oracle = await blockchain.treasury('oracle');
        const operatorFeeAddress = await blockchain.treasury('operatorFeeAddress');
        const calculatedMarketAddress = (
            await Market.fromInit(
                1n,
                owner.address,
                coin.address,
                Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'),
                factory.address,
                'TEST',
                86400n,
                Cell.EMPTY,
                toNano('0.01'),
                toNano('0.005'),
                oracle.address,
                1n,
                2n,
                operatorFeeAddress.address,
            )
        ).address;
        const deployMarketResult = await factory.send(
            sender.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'DeployTokenMarket',
                queryId: 1n,
                id: 1n,
                owner: owner.address,
                coin: coin.address,
                jettonWallet: jettonWallet.address,
                underlyingAssetName: 'TEST',
                duration: 86400n,
                collection_content: Cell.EMPTY,
                operatorFee: toNano('0.01'),
                serviceFee: toNano('0.005'),
                oracle: oracle.address,
                feedIdAsset: 1n,
                feedIdToken: 2n,
                operatorFeeAddress: operatorFeeAddress.address,
                originalGasTo: sender.address,
            },
        );

        expect(deployMarketResult.transactions).not.toHaveTransaction({
            success: false,
        });
        const event = loadMarketDeployedEvent(deployMarketResult.externals[0].body.asSlice());
        // Check for MarketDeployedEvent
        expect(event).toBeDefined();
        if (event) {
            const { marketAddress, id, owner: eventOwner } = event;
            expect(marketAddress).toBeDefined();
            expect(id).toBe(1n);
            expect(eventOwner.equals(owner.address)).toBe(true);
        }

        // Check that a new contract was actually deployed
        const marketAddress = event.marketAddress;
        expect(marketAddress).toEqualAddress(calculatedMarketAddress);
        const market = await blockchain.openContract(Market.fromAddress(marketAddress));
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(await market.getAmm()).toEqualAddress(Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'));
        expect(await market.getJettonWallet()).toEqualAddress(jettonWallet.address);
        expect(await market.getUnderlyingAssetName()).toEqual('TEST');
        expect(await market.getDuration()).toEqual(86400n);
        expect(await market.getCollectionContent()).toEqualCell(Cell.EMPTY);
        expect(await market.getOperatorFee()).toEqual(toNano('0.01'));
        expect(await market.getServiceFee()).toEqual(toNano('0.005'));
        expect(await market.getOracle()).toEqualAddress(oracle.address);
        expect(await market.getFeedIdAsset()).toEqual(1n);
        expect(await market.getFeedIdToken()).toEqual(2n);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress.address);
        expect(await market.getCountDeal()).toEqual(0n);
    });

    it('should deploy a new market with params form real world', async () => {
        const sender = await blockchain.treasury('sender');
        const owner = await blockchain.treasury('owner');
        const jettonMasterAddress = Address.parse('EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw');
        const oracleAddress = Address.parse('EQD1HG-Y_20MGKGZc_fi-hB_9iIGLJvNf4JVZGXTWG93sRmI');
        const feedAssetId = 4543560n; // ETH
        const feedTokenId = 1431520340n; // USDT
        const id = 1n;
        const coin = jettonMasterAddress;
        const serviceFee = toNano('0.01'); // 1%
        const operatorFee = toNano('0.01'); // 1%
        const content = Cell.EMPTY;
        const duration = 60n; // 10 days
        const underlyingAssetName = 'ETH';
        const operatorFeeAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');
        const ammAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'); //zero address

        const calculatedMarketAddress = (
            await Market.fromInit(
                id,
                owner.address,
                coin,
                ammAddress,
                factory.address,
                underlyingAssetName,
                duration,
                content,
                operatorFee,
                serviceFee,
                oracleAddress,
                feedAssetId,
                feedTokenId,
                operatorFeeAddress,
            )
        ).address;
        const deployMarketResult = await factory.send(
            sender.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'DeployTokenMarket',
                queryId: 0n,
                id: id,
                owner: owner.address,
                coin: coin,
                jettonWallet: operatorFeeAddress,
                underlyingAssetName,
                duration,
                collection_content: content,
                operatorFee,
                serviceFee,
                oracle: oracleAddress,
                feedIdAsset: feedAssetId,
                feedIdToken: feedTokenId,
                operatorFeeAddress,
                originalGasTo: sender.address,
            },
        );

        expect(deployMarketResult.transactions).not.toHaveTransaction({
            success: false,
        });
        const event = loadMarketDeployedEvent(deployMarketResult.externals[0].body.asSlice());
        // Check for MarketDeployedEvent
        expect(event).toBeDefined();
        if (event) {
            const { marketAddress, id, owner: eventOwner } = event;
            expect(marketAddress).toBeDefined();
            expect(id).toBe(1n);
            expect(eventOwner.equals(owner.address)).toBe(true);
        }

        // Check that a new contract was actually deployed
        const marketAddress = event.marketAddress;
        const market = await blockchain.openContract(Market.fromAddress(marketAddress));
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(await market.getAmm()).toEqualAddress(operatorFeeAddress);
        expect(await market.getJettonWallet()).toEqualAddress(operatorFeeAddress);
        expect(await market.getUnderlyingAssetName()).toEqual(underlyingAssetName);
        expect(await market.getDuration()).toEqual(duration);
        expect(await market.getCollectionContent()).toEqualCell(content);
        expect(await market.getOperatorFee()).toEqual(operatorFee);
        expect(await market.getServiceFee()).toEqual(serviceFee);
        expect(await market.getOracle()).toEqualAddress(oracleAddress);
        expect(await market.getFeedIdAsset()).toEqual(feedAssetId);
        expect(await market.getFeedIdToken()).toEqual(feedTokenId);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress);
        expect(await market.getCountDeal()).toEqual(0n);
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(marketAddress).toEqualAddress(calculatedMarketAddress);
    });

    it('should deploy a new market with amm', async () => {
        const sender = await blockchain.treasury('sender');
        const owner = await blockchain.treasury('owner');
        const coin = await blockchain.treasury('coin');
        const jettonWallet = await blockchain.treasury('jettonWallet');
        const jettonWalletAmm = await blockchain.treasury('jettonWalletAmm');
        const oracle = await blockchain.treasury('oracle');
        const operatorFeeAddress = await blockchain.treasury('operatorFeeAddress');

        const deployMarketResult = await factory.send(
            sender.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'DeployTokenMarketWithAmm',
                queryId: 1n,
                id: 1n,
                owner: owner.address,
                coin: coin.address,
                jettonWallet: jettonWallet.address,
                jettonWalletAmm: jettonWalletAmm.address,
                underlyingAssetName: 'TEST',
                duration: 86400n,
                collection_content: Cell.EMPTY,
                operatorFee: toNano('0.01'),
                serviceFee: toNano('0.005'),
                oracle: oracle.address,
                feedIdAsset: 1n,
                feedIdToken: 2n,
                operatorFeeAddress: operatorFeeAddress.address,
                originalGasTo: sender.address,
            },
        );

        expect(deployMarketResult.transactions).not.toHaveTransaction({
            success: false,
        });
        const event = loadMarketDeployedEventWithAmm(deployMarketResult.externals[0].body.asSlice());
        // Check for MarketDeployedEvent
        expect(event).toBeDefined();
        if (event) {
            const { marketAddress, id, owner: eventOwner } = event;
            expect(marketAddress).toBeDefined();
            expect(id).toBe(1n);
            expect(eventOwner.equals(owner.address)).toBe(true);
        }

        // Check that a new contract was actually deployed
        const marketAddress = event.marketAddress;
        const market = await blockchain.openContract(Market.fromAddress(marketAddress));
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(await market.getAmm()).not.toEqualAddress(
            Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'),
        );
        expect(await market.getJettonWallet()).toEqualAddress(jettonWallet.address);
        expect(await market.getUnderlyingAssetName()).toEqual('TEST');
        expect(await market.getDuration()).toEqual(86400n);
        expect(await market.getCollectionContent()).toEqualCell(Cell.EMPTY);
        expect(await market.getOperatorFee()).toEqual(toNano('0.01'));
        expect(await market.getServiceFee()).toEqual(toNano('0.005'));
        expect(await market.getOracle()).toEqualAddress(oracle.address);
        expect(await market.getFeedIdAsset()).toEqual(1n);
        expect(await market.getFeedIdToken()).toEqual(2n);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress.address);
        expect(await market.getCountDeal()).toEqual(0n);
    });

    it('should deploy a new TON market', async () => {
        const sender = await blockchain.treasury('sender');
        const owner = await blockchain.treasury('owner');
        const oracle = await blockchain.treasury('oracle');
        const operatorFeeAddress = await blockchain.treasury('operatorFeeAddress');

        const deployMarketResult = await factory.send(
            sender.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'DeployTonMarket',
                queryId: 0n,
                id: 1n,
                owner: owner.address,
                underlyingAssetName: 'TEST',
                duration: 86400n,
                collection_content: Cell.EMPTY,
                operatorFee: toNano('0.01'),
                serviceFee: toNano('0.005'),
                oracle: oracle.address,
                feedIdAsset: 1n,
                feedIdToken: 2n,
                operatorFeeAddress: operatorFeeAddress.address,
                originalGasTo: sender.address,
            },
        );

        expect(deployMarketResult.transactions).not.toHaveTransaction({
            success: false,
        });

        const event = loadMarketTonDeployedEvent(deployMarketResult.externals[0].body.asSlice());
        expect(event).toBeDefined();
        if (event) {
            const { marketAddress, id, owner: eventOwner } = event;
            expect(marketAddress).toBeDefined();
            expect(id).toBe(1n);
            expect(eventOwner.equals(owner.address)).toBe(true);
        }

        const marketAddress = event.marketAddress;
        const market = await blockchain.openContract(Market.fromAddress(marketAddress));
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(await market.getAmm()).toEqualAddress(Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'));
        expect(await market.getUnderlyingAssetName()).toEqual('TEST');
        expect(await market.getDuration()).toEqual(86400n);
        expect(await market.getCollectionContent()).toEqualCell(Cell.EMPTY);
        expect(await market.getOperatorFee()).toEqual(toNano('0.01'));
        expect(await market.getServiceFee()).toEqual(toNano('0.005'));
        expect(await market.getOracle()).toEqualAddress(oracle.address);
        expect(await market.getFeedIdAsset()).toEqual(1n);
        expect(await market.getFeedIdToken()).toEqual(2n);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress.address);
        expect(await market.getCountDeal()).toEqual(0n);
    });

    it('should deploy a new TON market with AMM', async () => {
        const sender = await blockchain.treasury('sender');
        const owner = await blockchain.treasury('owner');
        const oracle = await blockchain.treasury('oracle');
        const operatorFeeAddress = await blockchain.treasury('operatorFeeAddress');

        const deployMarketResult = await factory.send(
            sender.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'DeployTonMarketWithAmm',
                queryId: 0n,
                id: 1n,
                owner: owner.address,
                underlyingAssetName: 'TEST',
                duration: 86400n,
                collection_content: Cell.EMPTY,
                operatorFee: toNano('0.01'),
                serviceFee: toNano('0.005'),
                oracle: oracle.address,
                feedIdAsset: 1n,
                feedIdToken: 2n,
                operatorFeeAddress: operatorFeeAddress.address,
                originalGasTo: sender.address,
            },
        );

        expect(deployMarketResult.transactions).not.toHaveTransaction({
            success: false,
        });

        const event = loadMarketTonDeployedEventWithAmm(deployMarketResult.externals[0].body.asSlice());
        expect(event).toBeDefined();
        if (event) {
            const { marketAddress, id, owner: eventOwner, amm } = event;
            expect(marketAddress).toBeDefined();
            expect(amm).toBeDefined();
            expect(id).toBe(1n);
            expect(eventOwner.equals(owner.address)).toBe(true);
        }

        const marketAddress = event.marketAddress;
        const market = await blockchain.openContract(Market.fromAddress(marketAddress));
        expect(await market.getOwner()).toEqualAddress(owner.address);
        expect(await market.getAmm()).toEqualAddress(event.amm);
        expect(await market.getUnderlyingAssetName()).toEqual('TEST');
        expect(await market.getDuration()).toEqual(86400n);
        expect(await market.getCollectionContent()).toEqualCell(Cell.EMPTY);
        expect(await market.getOperatorFee()).toEqual(toNano('0.01'));
        expect(await market.getServiceFee()).toEqual(toNano('0.005'));
        expect(await market.getOracle()).toEqualAddress(oracle.address);
        expect(await market.getFeedIdAsset()).toEqual(1n);
        expect(await market.getFeedIdToken()).toEqual(2n);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress.address);
        expect(await market.getCountDeal()).toEqual(0n);
    });

    it('should return correct id', async () => {
        const id = await factory.getId();
        expect(id).toBe(0n);
    });
});
