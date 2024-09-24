import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
// import { MyJeton } from '../wrappers/MyJetton';
import '@ton/test-utils';

// describe('MyJeton', () => {
//     let blockchain: Blockchain;
//     let deployer: SandboxContract<TreasuryContract>;
//     let myJeton: SandboxContract<MyJeton>;

//     beforeEach(async () => {
//         blockchain = await Blockchain.create();

//         myJeton = blockchain.openContract(await MyJeton.fromInit());

//         deployer = await blockchain.treasury('deployer');

//         const deployResult = await myJeton.send(
//             deployer.getSender(),
//             {
//                 value: toNano('0.05'),
//             },
//             {
//                 $$type: 'Deploy',
//                 queryId: 0n,
//             }
//         );

//         expect(deployResult.transactions).toHaveTransaction({
//             from: deployer.address,
//             to: myJeton.address,
//             deploy: true,
//             success: true,
//         });
//     });

//     it('should deploy', async () => {
//         // the check is done inside beforeEach
//         // blockchain and myJeton are ready to use
//     });
// });
