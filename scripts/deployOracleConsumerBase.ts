import { toNano } from '@ton/core';
import { OracleConsumerBase } from '../wrappers/OracleConsumerBase';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const oracleConsumerBase = provider.open(await OracleConsumerBase.fromInit());

    await oracleConsumerBase.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(oracleConsumerBase.address);

    // run methods on `oracleConsumerBase`
}
