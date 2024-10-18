import { toNano } from '@ton/core';
import { Factory } from '../wrappers/Factory';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const factory = provider.open(await Factory.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await factory.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(factory.address);

    console.log('ID', await factory.getId());
}
