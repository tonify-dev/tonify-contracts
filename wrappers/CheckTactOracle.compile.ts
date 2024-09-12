import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/check_tact_oracle.tact',
    options: {
        debug: true,
    },
};
