import ECPairFactory from "ecpair";
import { BIP32Factory } from "bip32";
import * as tinysecp256k1 from "tiny-secp256k1";

export const bip32 = BIP32Factory(tinysecp256k1);
export const ECPair = ECPairFactory(tinysecp256k1);
