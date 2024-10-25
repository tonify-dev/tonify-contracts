import { beginCell, toNano } from '@ton/core';
import { MyJetton } from '../wrappers/MyJetton';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const myJetton = provider.open(await MyJetton.fromInit(provider.sender().address!, beginCell().endCell(), toNano(1000000000000)));

    await myJetton.send(
        provider.sender(),
        {
            value: toNano('0.15'),
        },
        "Mint: 100"
    );

    await provider.waitForDeploy(myJetton.address);

    // run methods on `myJetton`
}
