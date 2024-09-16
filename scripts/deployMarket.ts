import { toNano } from '@ton/core';
import { Market } from '../wrappers/Market';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const market = provider.open(await Market.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await market.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(market.address);

    console.log('ID', await market.getId());
}
