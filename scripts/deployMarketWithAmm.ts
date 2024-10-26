import { Address, beginCell, Cell, toNano } from '@ton/core';
import { Amm } from '../wrappers/Amm';
import { Factory } from '../wrappers/Factory';
import { NetworkProvider } from '@ton/blueprint';
import { Market } from '../wrappers/Market';
import * as data from '../state.json';
import { calculateJettonDefaultWalletAddress } from './uitls/calculateJettonWalletAddress';

const jettonMasterAddress = Address.parse('EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw');
const oracleAddress = Address.parse('EQD1HG-Y_20MGKGZc_fi-hB_9iIGLJvNf4JVZGXTWG93sRmI');
const feedAssetId = 4543560n; // ETH
const feedTokenId = 1431520340n; // USDT
const id = 2n;
const coin = jettonMasterAddress;
const serviceFee = toNano('0.01'); // 1%
const operatorFee = toNano('0.01'); // 1%
const content = Cell.EMPTY;
const duration = 60n; // 1 minute
const underlyingAssetName = 'ETH';
const operatorFeeAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ');

export async function run(provider: NetworkProvider) {
    const factoryAddress = data[provider.network()].factory;
    const owner = provider.sender().address!;

    const factory = provider.open(await Factory.fromAddress(Address.parse(factoryAddress)));
    const amm = await Amm.fromInit(
        id,
        Address.parse(factoryAddress),
        owner,
    );
    console.log('amm', amm.address);
    const jettonDefaultWalletAddressAmm = await calculateJettonDefaultWalletAddress(jettonMasterAddress, amm.address);
    const market = provider.open(await Market.fromInit(
        id,
        owner,
        coin,
        amm.address,
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
    ));
    console.log('market', market.address);
    const jettonDefaultWalletAddressMarket = await calculateJettonDefaultWalletAddress(
        market.address,
        jettonMasterAddress,
    );

    await factory.send(
        provider.sender(),
        {
            value: toNano('0.45'),
        },
        {
            $$type: 'DeployTokenMarketWithAmm',
            queryId: 0n,
            id,
            owner,
            coin,
            jettonWallet: jettonDefaultWalletAddressMarket,
            jettonWalletAmm: jettonDefaultWalletAddressAmm,
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

    await provider.waitForDeploy(amm.address);
    await provider.waitForDeploy(market.address);

    console.log('ID', await market.getId());
}
