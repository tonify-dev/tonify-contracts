import { toNano } from '@ton/core';
import { Amm } from '../wrappers/Amm';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const amm = provider.open(await Amm.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await amm.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(amm.address);

    console.log('ID', await amm.getId());
}
