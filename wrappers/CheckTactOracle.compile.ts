import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/oracle/tests/check_tact_oracle.tact',
    options: {
        debug: true,
    },
};
