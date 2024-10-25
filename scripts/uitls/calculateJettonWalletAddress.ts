import { JettonDefaultWallet } from '../../wrappers/JettonDefaultWallet';
import { Address } from '@ton/core';

export async function calculateJettonDefaultWalletAddress(jettonMasterAddress: Address, ownerAddress: Address): Promise<Address> {
    return (await JettonDefaultWallet.fromInit(ownerAddress, jettonMasterAddress)).address;
}
