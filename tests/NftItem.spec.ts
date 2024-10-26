import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Address, beginCell, toNano } from '@ton/core';
import { NftItem } from '../wrappers/NftItem';
import '@ton/test-utils';

describe('NftItem', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nftItem: SandboxContract<NftItem>;
    let owner: SandboxContract<TreasuryContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();
        owner = await blockchain.treasury('owner');
        deployer = await blockchain.treasury('deployer');

        const content = beginCell().endCell();
        nftItem = blockchain.openContract(
            await NftItem.fromInit(deployer.address, 0n)
        );

        const deployResult = await nftItem.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Transfer',
                query_id: 0n,
                new_owner: owner.address,
                response_destination: deployer.address,
                custom_payload: null,
                forward_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nftItem.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy with correct init data', async () => {
        const data = await nftItem.getGetNftData();
        expect(data.is_initialized).toBe(true);
        expect(data.index).toBe(0n);
        expect(data.collection_address?.equals(deployer.address)).toBe(true);
        expect(data.owner_address?.equals(owner.address)).toBe(true);
    });

    it('should transfer ownership', async () => {
        const newOwner = await blockchain.treasury('newOwner');
        
        const transferResult = await nftItem.send(
            owner.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Transfer',
                query_id: 1n,
                new_owner: newOwner.address,
                response_destination: owner.address,
                custom_payload: null,
                forward_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(transferResult.transactions).toHaveTransaction({
            from: owner.address,
            to: nftItem.address,
            success: true,
        });

        const data = await nftItem.getGetNftData();
        expect(data.owner_address?.equals(newOwner.address)).toBe(true);
    });

    it('should not allow transfer from non-owner', async () => {
        const attacker = await blockchain.treasury('attacker');
        const newOwner = await blockchain.treasury('newOwner');
        
        const transferResult = await nftItem.send(
            attacker.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Transfer',
                query_id: 1n,
                new_owner: newOwner.address,
                response_destination: attacker.address,
                custom_payload: null,
                forward_amount: 0n,
                forward_payload: beginCell().endCell().asSlice(),
            }
        );

        expect(transferResult.transactions).toHaveTransaction({
            from: attacker.address,
            to: nftItem.address,
            success: false,
        });

        const data = await nftItem.getGetNftData();
        expect(data.owner_address?.equals(owner.address)).toBe(true);
    });
});
