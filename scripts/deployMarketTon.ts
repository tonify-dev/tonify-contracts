import { Address, beginCell, Cell, toNano } from '@ton/core';
import { Amm } from '../wrappers/Amm';
import { Factory, loadMarketDeployedEvent } from '../wrappers/Factory';
import { NetworkProvider } from '@ton/blueprint';
import { MarketTon } from '../wrappers/MarketTon';
import * as data from '../state.json';
import { calculateJettonDefaultWalletAddress } from './uitls/calculateJettonWalletAddress';

const jettonMasterAddress = Address.parse('EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw');
const oracleAddress = Address.parse('EQD1HG-Y_20MGKGZc_fi-hB_9iIGLJvNf4JVZGXTWG93sRmI');
const ammAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'); //zero address
const feedAssetId = 4543560n; // ETH
const feedTokenId = 1431520340n; // USDT
const id = 1n;
const coin = jettonMasterAddress;
const serviceFee = toNano('0.01'); // 1%
const operatorFee = toNano('0.01'); // 1%
const content = Cell.EMPTY;
const duration = 60n; // 2 minutes
const underlyingAssetName = 'ETH';
const operatorFeeAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');

export async function run(provider: NetworkProvider) {
    const factoryAddress = data[provider.network()].factory;
    const owner = provider.sender().address!;

    const factory = provider.open(await Factory.fromAddress(Address.parse(factoryAddress)));

    const market = provider.open(
        await MarketTon.fromInit(
            id,
            owner,
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
        ),
    );


    await factory.send(
        provider.sender(),
        {
            value: toNano('0.35'),
        },
        {
            $$type: 'DeployTonMarket',
            queryId: 0n,
            id,
            owner,
            underlyingAssetName,
            duration,
            collection_content: content,
            oracle: oracleAddress,
            feedIdAsset: feedAssetId,
            feedIdToken: feedTokenId,
            operatorFee,
            serviceFee,
            operatorFeeAddress,
            originalGasTo: owner,
        },
    );

    await provider.waitForDeploy(market.address);

    console.log('ID', await market.getId());
}
