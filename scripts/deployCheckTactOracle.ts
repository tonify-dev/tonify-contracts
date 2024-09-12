import { toNano } from '@ton/core';
import { CheckTactOracle } from '../wrappers/CheckTactOracle';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const checkTactOracle = provider.open(await CheckTactOracle.fromInit());

    await checkTactOracle.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(checkTactOracle.address);

    // run methods on `checkTactOracle`
}
