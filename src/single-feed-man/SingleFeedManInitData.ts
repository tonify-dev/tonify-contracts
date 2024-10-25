import { consts } from "@redstone-finance/protocol";
import { beginCell, Cell, serializeTuple } from "@ton/core";
import { hexlify, toUtf8Bytes } from "ethers/lib/utils";
import { SIGNER_COUNT_THRESHOLD_BITS } from "../config/constants";
import { createTupleItems } from "../ton-utils";
import { TonInitData } from "../TonInitData";

export class SingleFeedManInitData implements TonInitData {
  constructor(
    private feedId: string,
    private signerCountThreshold: number,
    private signers: string[],
    private secondFeedId: string = 'USDC',
  ) {}

  toCell(): Cell {
    console.log(BigInt(hexlify(toUtf8Bytes(this.feedId))))
    console.log(BigInt(hexlify(toUtf8Bytes(this.secondFeedId))))
    return beginCell()
      .storeUint(
        BigInt(hexlify(toUtf8Bytes(this.feedId))),
        consts.DATA_FEED_ID_BS * 8
      )
      .storeUint(this.signerCountThreshold, SIGNER_COUNT_THRESHOLD_BITS)
      .storeUint(0, consts.DEFAULT_NUM_VALUE_BS * 8)
      .storeUint(0, consts.TIMESTAMP_BS * 8)
      .storeRef(serializeTuple(createTupleItems(this.signers)))
      .storeRef(beginCell().storeUint(
        BigInt(hexlify(toUtf8Bytes(this.secondFeedId))),
        consts.DATA_FEED_ID_BS * 8
      ).endCell())
      .endCell();
  }
}
