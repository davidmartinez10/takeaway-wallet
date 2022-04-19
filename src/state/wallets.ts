import { BigFloat } from "bigfloat.js";
import PouchDB from "pouchdb-browser";
import { Coins, WalletObject } from "../types";
import * as bitcoin from "bitcoinjs-lib";
import * as wallets from "../wallets";
import { create_db_hook } from "use-pouchdb-collection";

interface WalletLiveData {
  symbol: Coins;
  address?: string;
  balance?: BigFloat;
}

const mnemonic =
  "stomach lake often total opinion net desert vintage used embark follow wear prefer give egg word tip piano seminar inch forget urban shiver one";
// const mnemonic = "trial produce tennis brief disease enhance place venue abuse access good song bulb evoke uncover autumn quarter immune animal pause square taste ahead sustain";
// wallets(mnemonic);

interface BaseWallet {
  symbol: Coins;
  derivation_path: string;
  host: string;
}

export interface Web3WalletConfig extends BaseWallet {
  type: "web3";
  chainId: number;
}

export interface ElectrumWalletConfig extends BaseWallet {
  type: "electrumx";
  network: bitcoin.Network;
  port: number;
}

type WalletConfig = Web3WalletConfig | ElectrumWalletConfig;

export const wallet_live_data = new PouchDB<WalletLiveData>("wallet-live-data");
export const currencies_configuration = new PouchDB<WalletConfig>(
  "currencies-configuration"
);
export const wallets_map = new Map<Coins, WalletObject>();
(window as any)._W = wallets_map;
function transform_config(data: WalletConfig[]) {
  async function run() {
    for (const config of data) {
      // @ts-ignore
      const w = wallets[config.type](mnemonic, config);
      wallet_live_data.put({
        _id: config.symbol,
        symbol: config.symbol,
        address: w.address,
        balance: await w.getBalance(),
      });
      wallets_map.set(config.symbol, w);
    }
  }
  run();
  return data;
}

function collection_to_key_value(documents: WalletLiveData[]) {
  return documents.reduce(function (acc, cur) {
    return Object.assign(acc, { [cur.symbol ?? ""]: cur });
  }, {} as WalletLiveData[]);
}

export const use_wallets = create_db_hook(
  wallet_live_data,
  collection_to_key_value
);
export const use_wallets_config = create_db_hook(
  currencies_configuration,
  transform_config
);

async function init() {
  {
    const network: bitcoin.Network = {
      messagePrefix: "\x19Bitcoin Signed Message:\n",
      bech32: "btc",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4,
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80,
    };

    try {
      await currencies_configuration.get(Coins.BTC);
    } catch {
      await currencies_configuration.put({
        _id: Coins.BTC,
        type: "electrumx",
        symbol: Coins.BTC,
        network,
        derivation_path: "m/44'/0'/0'/0/0",
        host: "fortress.qtornado.com",
        port: 443,
      });
    }

    try {
      await wallet_live_data.get(Coins.BTC);
    } catch {
      await wallet_live_data.put({
        _id: Coins.BTC,
        symbol: Coins.BTC,
      });
    }
  }
  // {
  //   const network: bitcoin.Network = {
  //     messagePrefix: "\x19Litecoin Signed Message:\n",
  //     bech32: "ltc",
  //     bip32: {
  //       public: 0x019da462,
  //       private: 0x019d9cfe,
  //     },
  //     pubKeyHash: 0x30,
  //     scriptHash: 0x32,
  //     wif: 0xb0,
  //   };

  //   try {
  //     await currencies_configuration.get(Coins.LTC);
  //   } catch {
  //     await currencies_configuration.put({
  //       _id: Coins.LTC,
  //       type: "electrumx",
  //       symbol: Coins.LTC,
  //       network,
  //       derivation_path: "m/44'/2'/0'/0/0",
  //       host: "",
  //       port: 0,
  //     });
  //   }

  //   try {
  //     await wallet_live_data.get(Coins.LTC);
  //   } catch {
  //     await wallet_live_data.put({
  //       _id: Coins.LTC,
  //       symbol: Coins.LTC,
  //     });
  //   }
  // }

  // try {
  //   await currencies_configuration.get(Coins.ETH);
  // } catch {
  //   await currencies_configuration.put({
  //     _id: Coins.ETH,
  //     type: "web3",
  //     symbol: Coins.ETH,
  //     derivation_path: "m/44'/60'/0'/0/0",
  //     host: "https://mainnet.infura.io/v3/b3362d086e574461b4004935747c94af",
  //     chainId: 1,
  //   });
  // }

  // try {
  //   await wallet_live_data.get(Coins.ETH);
  // } catch {
  //   await wallet_live_data.put({
  //     _id: Coins.ETH,
  //     symbol: Coins.ETH,
  //   });
  // }
}

init();
