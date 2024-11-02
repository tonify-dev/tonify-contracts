import { Address, beginCell, Cell, toNano } from '@ton/core';
import { storeTakeDeal } from '../wrappers/Market';
import { Factory, loadTokenTransfer } from '../wrappers/Factory';
import { NetworkProvider } from '@ton/blueprint';
import { Market } from '../wrappers/Market';
import * as data from '../state.json';
import { calculateJettonDefaultWalletAddress } from './uitls/calculateJettonWalletAddress';
import { JettonDefaultWallet } from '../wrappers/JettonDefaultWallet';
import { ContractParamsProvider } from '@redstone-finance/sdk';
import { createCellFromParamsProvider } from '../tests/helpers/test_helpers';

const jettonMasterAddress = Address.parse('EQAEjTwIDPZDLkPMbzUB5Pdu3BIbKYVdzgSp9wG3VHJL-rWw');
const oracleAddress = Address.parse('EQD1HG-Y_20MGKGZc_fi-hB_9iIGLJvNf4JVZGXTWG93sRmI');
const ammAddress = Address.parse('UQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKZ'); //zero address
const feedAssetId = 4543560n; // ETH
const feedTokenId = 1431520340n; // USDT
const marketAddress = Address.parse('EQCqR3zpA396_19lwMaSZHY7tmE2TemPkBF4NGpxoRMPBN7A');
const rateAsset = 251190000000n; // rate asset in 8 decimals
const rateToken = 101000000n; // rate token in 8 decimals
const percent = toNano('0.01'); // 1%
const expiration = 60n * 60n * 24n * 30n; // 30 days
const slippage = toNano('0.1'); // 10%
const SLIPPAGE_DENOMINATOR = 10n ** 25n;
const COLLATERAL_DENOMINATOR = 10n ** 16n;



function getAmountWithoutSlippage(rateAsset: bigint, rateToken: bigint, percent: bigint): bigint {
    return (rateAsset * rateToken * percent) / COLLATERAL_DENOMINATOR;
}

export async function run(provider: NetworkProvider) {
    const owner = provider.sender().address!;

    const market = provider.open(await Market.fromAddress(marketAddress));

    const jettonDefaultWalletAddressOwner = await calculateJettonDefaultWalletAddress(jettonMasterAddress, owner);
    const walletOwner = provider.open(await JettonDefaultWallet.fromAddress(jettonDefaultWalletAddressOwner));
    // const data  = Cell.fromBoc(Buffer.from('b5ee9c720101010100580000ab0f8a7ea50000000000000000505da86aa4080028976858f438b219d0523705a02aadf60e497940084e1439b272d88d51acb229000512ed0b1e8716433a0a46e0b40555bec1c92f280109c287364e5b11aa3596450011', 'hex'))[0];
    // const tokenTransfer = loadTokenTransfer(data.beginParse());
    // console.log('data', tokenTransfer.forward_payload.loadUint(8));
    const createDealData = beginCell()
        .store(
            storeTakeDeal({
                $$type: 'TakeDeal',
                dealId: 0n,
                oracleAssetData:  await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 2,
                        dataPackagesIds: ['ETH'],
                        // historicalTimestamp: 1730058590000,
                    }),
                ),
                oracleTokenData: await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 2,
                        dataPackagesIds: ['USDT'],
                        // historicalTimestamp: 1730058590000,
                    }),
                ),
            }),
        )
        .asSlice();

    const amount = getAmountWithoutSlippage(rateAsset, rateToken, percent);
    const balanceBefore = (await walletOwner.getGetWalletData()).balance;
    console.log('Amount:', amount);
    console.log('User balance:', balanceBefore);
    if (balanceBefore >= amount) {
        await walletOwner.send(
            provider.sender(),
            {
                value: toNano('0.9'),
            },
            {
                $$type: 'TokenTransfer',
                amount: amount,
                query_id: 0n,
                recipient: market.address,
                response_destination: owner,
                custom_payload: null,
                forward_ton_amount: toNano('0.8'),
                forward_payload: createDealData,
            },
        );
    }
}
