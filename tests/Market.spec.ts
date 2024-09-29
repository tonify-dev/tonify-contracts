import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, toNano } from '@ton/core';
import { Market, storeCreateDeal } from '../wrappers/Market';
import '@ton/test-utils';
import { MyJetton } from '../wrappers/MyJetton';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { OracleMock } from '../wrappers/OracleMock';

describe('Market', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let owner: SandboxContract<TreasuryContract>;
    let operatorFeeAddress: SandboxContract<TreasuryContract>;
    let serviceFeeAddress: SandboxContract<TreasuryContract>;
    let amm: SandboxContract<TreasuryContract>;
    let jettonMaster: SandboxContract<MyJetton>;
    let jettonWallet: SandboxContract<JettonDefaultWallet>;
    let jettonWalletTaker: SandboxContract<JettonDefaultWallet>;
    let jettonWalletMaker: SandboxContract<JettonDefaultWallet>;
    let oracle: SandboxContract<OracleMock>;
    let maker: SandboxContract<TreasuryContract>;
    let taker: SandboxContract<TreasuryContract>;
    let factory: SandboxContract<TreasuryContract>;
    let market: SandboxContract<Market>;
    const feedId = 34n;
    const serviceFee = toNano('0.01'); // 1%
    const operatorFee = toNano('0.01'); // 1%
    const content = beginCell().endCell();
    const duration = 60n * 60n * 24n * 10n; // 10 days
    const underlyingAssetName = 'USDT';
    const ZERO_ADDRESS = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        deployer = await blockchain.treasury('deployer');
        owner = await blockchain.treasury('owner');
        operatorFeeAddress = await blockchain.treasury('operatorFeeAddress');
        serviceFeeAddress = await blockchain.treasury('serviceFeeAddress'); 

        amm = await blockchain.treasury('amm');
        taker = await blockchain.treasury('taker');
        maker = await blockchain.treasury('maker');
        factory = await blockchain.treasury('factory');
        jettonMaster = blockchain.openContract(await MyJetton.fromInit(owner.address, beginCell().endCell(), toNano('1000000000')));
        const mintResult = await jettonMaster.send(owner.getSender(), {
            value: toNano('0.05'),
        }, {
            $$type: 'Mint',
            amount: toNano('100000000'),
            receiver: taker.address,
        });

        const mintResult2 = await jettonMaster.send(owner.getSender(), {
            value: toNano('0.05'),
        }, {
            $$type: 'Mint',
            amount: toNano('100000000'),
            receiver: maker.address,
        });

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
        const oracleDeployResult = await oracle.send(owner.getSender(), {
            value: toNano('0.05'),
        }, {
            $$type: 'Deploy',
            queryId: 0n,
        });

        expect(oracleDeployResult.transactions).toHaveTransaction({
            from: owner.address,
            to: oracle.address,
            success: true,
            deploy: true,
        });


        market = blockchain.openContract(await Market.fromInit(
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
        ));

        jettonWallet = blockchain.openContract(await JettonDefaultWallet.fromInit(market.address, jettonMaster.address));
        jettonWalletTaker = blockchain.openContract(await JettonDefaultWallet.fromInit(taker.address, jettonMaster.address));
        jettonWalletMaker = blockchain.openContract(await JettonDefaultWallet.fromInit(maker.address, jettonMaster.address));

        const deployResult = await market.send(
            factory.getSender(),
            {
                value: toNano('0.15'),
            },
            {
                $$type: 'InnerDeployMarket',
                queryId: 0n,
                jettonWallet: jettonWallet.address,
            }
        );
        // console.log(deployResult);

        // console.log(deployResult.transactions);

        expect(deployResult.transactions).toHaveTransaction({
            from: factory.address,
            to: market.address,
            deploy: true,
            success: true,
        });
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
        expect(await market.getFeedId()).toEqual(feedId);
        expect(await market.getOperatorFeeAddress()).toEqualAddress(operatorFeeAddress.address);
        expect(await market.getCountDeal()).toEqual(0n);
    });

    it('standard flow', async () => {

        const rate = toNano('1');
        const percent = toNano('1');
        const expiration = 60n * 60n * 24n * 10n; // 10 days
        const slippage = toNano('0.01') * toNano('1'); // 1%

        const createDealData = beginCell().store(storeCreateDeal({
            $$type: 'CreateDeal',
            makerPosition: true,
            rate: rate,
            percent: percent,
            expiration: expiration,
            slippage: slippage,
            oracleData: null,
        })).asSlice();
        

        const createDealResult = await jettonWalletMaker.send(maker.getSender(), {
            value: toNano('0.9'),
        }, {
            $$type: 'TokenTransfer',
            amount: toNano('100000000'),
            query_id: 0n,
            recipient: market.address,
            response_destination: null,
            custom_payload: null,
            forward_ton_amount: toNano('0.7'),
            forward_payload: createDealData,
        }); 


        expect(createDealResult.transactions).toHaveTransaction({
            from: maker.address,
            to: jettonWalletMaker.address,
            success: true,
        });

        expect(createDealResult.transactions).toHaveTransaction({
            from: jettonWalletMaker.address,
            to: jettonWallet.address,
            success: true,
        });

        expect(createDealResult.transactions).toHaveTransaction({
            from: jettonWallet.address,
            to: market.address,
            success: true,
        });

    });
});
