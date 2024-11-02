import { Address, beginCell, toNano } from '@ton/core';
import { Amm, storeCreateDeal } from '../wrappers/Amm';
import { Factory } from '../wrappers/Factory';
import { NetworkProvider } from '@ton/blueprint';
import { MarketTon } from '../wrappers/MarketTon';
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
const marketAddress = Address.parse('kQBT_LwRhiIfAMaW3Z7wlbuRy7CvOWMgOH-Rv-rBINAcZjh_');
const rateAsset = 251190000000n; // rate asset in 8 decimals
const rateToken = 100000000n; // rate token in 8 decimals
const percent = toNano('0.0001'); // 0.1%
const expiration = 60n * 60n * 24n * 30n; // 30 days
const slippage = toNano('0.1'); // 10%

const SLIPPAGE_DENOMINATOR = 10n ** 25n;
const COLLATERAL_DENOMINATOR = 10n ** 16n;

function getAmount(rateAsset: bigint, rateToken: bigint, percent: bigint, slippage: bigint): bigint {
    return (
        (rateAsset * percent * rateToken) / COLLATERAL_DENOMINATOR +
        (rateAsset * percent * slippage * rateToken) / SLIPPAGE_DENOMINATOR
    );
}

export async function run(provider: NetworkProvider) {
    const owner = provider.sender().address!;

    const market = provider.open(await MarketTon.fromAddress(marketAddress));


    const amount = getAmount(rateAsset, rateToken, percent, slippage);

    await market.send(
        provider.sender(),
        {
            value: toNano('0.5') + amount,
        },
        {
            $$type: 'CreateDealTon',
            deal: {
                $$type: 'CreateDealData',
                makerPosition: true,
                rateAsset: rateAsset,
                rateToken: rateToken,
                percent: percent,
                expiration: expiration,
                slippage: slippage,
                oracleAssetData: await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 2,
                        dataPackagesIds: ['ETH'],
                    }),
                ),
                oracleTokenData: await createCellFromParamsProvider(
                    new ContractParamsProvider({
                        dataServiceId: 'redstone-avalanche-prod',
                        uniqueSignersCount: 2,
                        dataPackagesIds: ['USDT'],
                    }),
                ),
            },
            queryId: 0n,
        },
    );
    
}
