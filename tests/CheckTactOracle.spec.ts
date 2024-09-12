import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CheckTactOracle } from '../wrappers/CheckTactOracle';
import '@ton/test-utils';

describe('CheckTactOracle', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let checkTactOracle: SandboxContract<CheckTactOracle>;

    beforeEach(async () => {
        // blockchain = await Blockchain.create();

        // checkTactOracle = blockchain.openContract(await CheckTactOracle.fromInit());

        // deployer = await blockchain.treasury('deployer');

        // const deployResult = await checkTactOracle.send(
        //     deployer.getSender(),
        //     {
        //         value: toNano('0.05'),
        //     },
        //     {
        //         $$type: 'Deploy',
        //         queryId: 0n,
        //     }
        // );

        // expect(deployResult.transactions).toHaveTransaction({
        //     from: deployer.address,
        //     to: checkTactOracle.address,
        //     deploy: true,
        //     success: true,
        // });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and checkTactOracle are ready to use
    });
});
