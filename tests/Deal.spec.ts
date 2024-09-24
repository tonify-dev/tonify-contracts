// import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
// import { toNano } from '@ton/core';
// import { Deal } from '../wrappers/Deal';
// import '@ton/test-utils';

// describe('Deal', () => {
//     let blockchain: Blockchain;
//     let deployer: SandboxContract<TreasuryContract>;
//     let deal: SandboxContract<Deal>;

//     // beforeEach(async () => {
//     //     blockchain = await Blockchain.create();

//     //     deal = blockchain.openContract(await Deal.fromInit());

//     //     deployer = await blockchain.treasury('deployer');

//     //     const deployResult = await deal.send(
//     //         deployer.getSender(),
//     //         {
//     //             value: toNano('0.05'),
//     //         },
//     //         {
//     //             $$type: 'Deploy',
//     //             queryId: 0n,
//     //         }
//     //     );

//     //     expect(deployResult.transactions).toHaveTransaction({
//     //         from: deployer.address,
//     //         to: deal.address,
//     //         deploy: true,
//     //         success: true,
//     //     });
//     // });

//     // it('should deploy', async () => {
//     //     // the check is done inside beforeEach
//     //     // blockchain and deal are ready to use
//     // });
// });
