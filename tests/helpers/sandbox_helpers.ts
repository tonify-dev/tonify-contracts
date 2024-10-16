import { Blockchain, SendMessageResult } from "@ton/sandbox";
import { SandboxTonNetwork } from "./SandboxTonNetwork";

export async function createTestNetwork(now: number = Math.floor(Date.now() / 1000)) {
  const blockchain = await Blockchain.create();
  blockchain.now = now;
  const deployer = await blockchain.treasury("deployer");

  return new SandboxTonNetwork(deployer.getSender(), blockchain);
}

export function extractSandboxLogs(
  consumerResult: void | SendMessageResult,
  transactionIndex: number
) {
  return (consumerResult as SendMessageResult).transactions[
    transactionIndex
  ].debugLogs
    .split("\n")
    .map((log) => log.substring("#DEBUG#: s0 = ".length));
}
