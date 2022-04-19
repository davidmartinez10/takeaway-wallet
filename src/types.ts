import type { BigFloat } from "bigfloat.js";

export enum Coins {
  ETH = "ETH",
  BTC = "BTC",
  LTC = "LTC",
}

export enum Modes {
  send = "send",
  send_offline = "send_offline",
  sign_message = "sign_message",
  verify_message = "verify_message",
}

export enum Views {
  home = "home",
  interface = "interface",
  createWallet = "createWallet",
  accessWallet = "accessWallet",
}

export interface TransactionInfo {
  txid: string;
  version: number;
  locktime: number;
  vin: {
    txid: string;
    vout: number;
    sequence: number;
    n: number;
    scriptSig: {
      hex: string;
      asm: string;
    };
    witnessStack: string[];
    type: string;
    addr: string;
    valueSat: number;
    value: number;
    doubleSpentTxID: string;
  }[];
  vout: {
    value: string;
    n: number;
    scriptPubKey: {
      hex: string;
      asm: string;
      type: string;
      addresses?: string[];
    };
    type: string;
    spentTxId: string | null;
    spentIndex: number | null;
    spentHeight: number | null;
  }[];
  blockhash: string;
  blockheight: number;
  confirmations: number;
  time: number;
  blocktime: number;
  valueOut: number;
  size: number;
  valueIn: number;
  fees: number;
}

export interface Signature {
  msg: string;
  address: string;
  sig: string;
  signer: string;
}

export interface TransactionOptions {
  nonce?: string | number;
  gasPrice?: string | number;
  gasLimit?: string | number;
  value: string;
  to: string;
}

export interface WalletObject {
  address: string;
  getBalance: { (): Promise<BigFloat> };
  sendTransaction: { (options: TransactionOptions): Promise<string> };
  getFee: { (): Promise<BigFloat> };
  signMessage: { (message: string): Promise<Signature> };
  verifySignature: { (signature: Signature): boolean };
}
