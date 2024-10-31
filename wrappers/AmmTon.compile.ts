import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/amm_ton.tact',
    options: {
        debug: true,
    },
};
