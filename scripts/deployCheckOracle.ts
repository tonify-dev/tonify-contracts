import { toNano } from '@ton/core';
import { CheckOracle } from '../wrappers/CheckOracle';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const checkOracle = provider.open(
        CheckOracle.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('CheckOracle')
        )
    );

    await checkOracle.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(checkOracle.address);

    console.log('ID', await checkOracle.getID());
}
