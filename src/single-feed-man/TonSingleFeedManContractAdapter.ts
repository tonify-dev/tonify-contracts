import { ContractParamsProvider } from "@redstone-finance/sdk";
import { TonSingleFeedMan } from "../../wrappers/TonSingleFeedMan";
import { AnyTonOpenedContract } from "../network/TonNetwork";

export class TonSingleFeedManContractAdapter {
  constructor(
    public readonly contract: AnyTonOpenedContract<TonSingleFeedMan>
  ) {}

  async sendDeploy(): Promise<void> {
    await this.contract.sendDeploy();
  }

  // async sendInternal(): Promise<void> {
  //   await this.contract.se();
  // }

  async getPriceFromPayload(paramsProvider: ContractParamsProvider) {
    return await this.contract.getPrice(paramsProvider);
  }

  async writePriceFromPayloadToContract(
    paramsProvider: ContractParamsProvider
  ) {
    await this.contract.sendWritePrice(paramsProvider);
  }

  async checkAndReturnPriceContract(paramsProvider: ContractParamsProvider) {
    return await this.contract.sendCheckAndReturnPrice(paramsProvider);
  }

  async readPriceAndTimestampFromContract() {
    return await this.contract.getReadPriceAndTimestamp();
  }
}
