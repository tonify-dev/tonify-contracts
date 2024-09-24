import { toNano } from '@ton/core';
import { Deal } from '../wrappers/Deal';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const deal = provider.open(await Deal.fromInit());

    await deal.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(deal.address);

    // run methods on `deal`
}
