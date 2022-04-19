import { payments } from "bitcoinjs-lib";
import * as bip39 from "bip39";
import bitcoinMessage from "bitcoinjs-message";
import { Unit } from "bitcore-lib";
import { BigFloat } from "bigfloat.js";
import {
  Signature,
  TransactionInfo,
  TransactionOptions,
  WalletObject,
} from "../types";
import { ElectrumWalletConfig } from "../state/wallets";
import { bip32, ECPair } from "../utils";

const methods = {
  get_transaction: "blockchain.transaction.get",
  estimate_fee: "blockchain.estimatefee",
  get_history: "blockchain.address.get_history",
  list_unspent: "blockchain.address.listunspent",
  get_balance: "blockchain.address.get_balance",
  broadcast_transaction: "blockchain.transaction.broadcast",
};

interface ElectrumUnspent {
  tx_hash: string;
  tx_pos: number;
  value: number;
}

export function electrumx(mnemonic: string, options: ElectrumWalletConfig) {
  const { derivation_path, host, port, network } = options;

  async function request<T>(method: string, params: any[]): Promise<T> {
    return (
      await (
        await fetch(host, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            method,
            params,
          }),
        })
      ).json()
    ).result;
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const derived_key = bip32.fromSeed(seed).derivePath(derivation_path);
  const { publicKey, privateKey } = derived_key;
  const { address } = payments.p2pkh({ pubkey: publicKey, network });
  const keyPair = ECPair.fromPrivateKey(privateKey!, { network });

  async function getBalance() {
    const { result } = await (
      await fetch(host, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host,
          port,
          method: methods.get_balance,
          params: [address],
        }),
      })
    ).json();
    return new BigFloat(Unit.fromSatoshis(result.confirmed).toBTC());
  }

  async function getUTXOs() {
    const unspents = await request<ElectrumUnspent[]>(methods.list_unspent, [
      address,
    ]);
    return await Promise.all(
      unspents.map(async (utx) => {
        const tx = await request<TransactionInfo>(methods.get_transaction, [
          utx.tx_hash,
          true,
        ]);
        return {
          hash: utx.tx_hash,
          address: tx.vout[utx.tx_pos].scriptPubKey.addresses![0],
          txid: tx.txid,
          amount: Unit.fromSatoshis(utx.value).toBTC(),
          satoshis: utx.value,
          vout: utx.tx_pos,
          scriptPubKey: tx.vout[utx.tx_pos].scriptPubKey.hex,
        };
      })
    );
  }

  async function getFeePerKb() {
    const fee = await request<number>(methods.estimate_fee, [2]);
    return new BigFloat(fee);
  }

  async function getFee(options: TransactionOptions) {
    const tx_hash = await createTransaction(options);
    const tx_size = tx_hash.length / 2;

    return (await getFeePerKb()).mul(tx_size);
  }

  async function createTransaction(options: TransactionOptions) {
    const { value, to } = options;
    const amountInSatoshis = Unit.fromBTC(Number(value)).toSatoshis();
    const feeInSatoshis = Unit.fromBTC(
      Number(await getFeePerKb())
    ).toSatoshis();

    const utxos = await getUTXOs();

    // @ts-ignore
    const tx = new bitcoin.TransactionBuilder(network);
    let current = 0;
    for (const utx of utxos) {
      tx.addInput(utx.hash, 1);
      current += utx.satoshis;
      if (current >= amountInSatoshis + feeInSatoshis) break;
    }
    tx.addOutput(to, amountInSatoshis);
    const change = current - (amountInSatoshis + feeInSatoshis);
    if (change) tx.addOutput(address!, change);
    tx.sign(0, keyPair);
    return tx.build().toHex();
  }

  async function sendTransaction(options: TransactionOptions) {
    const tx = await createTransaction(options);
    const tx_hash = await request(methods.broadcast_transaction, [tx]);
    return tx_hash;
  }

  async function signMessage(msg: string) {
    const signature = bitcoinMessage.sign(msg, privateKey!, keyPair.compressed);

    return {
      address,
      msg,
      sig: signature.toString("base64"),
      signer: "CBET",
    } as Signature;
  }

  function verifySignature(signature: Signature) {
    const { address, msg, sig } = signature;
    return bitcoinMessage.verify(msg, address, sig);
  }

  return {
    address,
    getBalance,
    sendTransaction,
    getFee,
    signMessage,
    verifySignature,
  } as WalletObject;
}
