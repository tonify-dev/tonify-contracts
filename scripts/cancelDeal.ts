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
const marketAddress = Address.parse('EQBt3AXW0hodMq-EbI9wQ085qbXBETdb1UXz12W09pNOYwB6');
const rateAsset = 248921732437n; // rate asset in 8 decimals
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

    const market = provider.open(await Market.fromAddress(marketAddress));


        await market.send(
            provider.sender(),
            {
                value: toNano('0.9'),
            },
            {
                $$type: 'CancelDeal',
                queryId: 0n,
                dealId: 1n,
            },
        );
}
