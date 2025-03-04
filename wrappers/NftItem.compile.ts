import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/nft/nft_item.tact',
    options: {
        debug: true,
    },
};
