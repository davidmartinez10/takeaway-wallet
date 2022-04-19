import { Coins, Modes, Views } from "../types";
import PouchDB from "pouchdb-browser";
import { create_db_hook } from "use-pouchdb-collection";

interface CoinState {
  _id: "active_coin";
  value: Coins;
}

interface ModeState {
  _id: "current_mode";
  value: Modes;
}

interface ViewState {
  _id: "current_view";
  value: Views;
}

interface UnlockedState {
  _id: "wallet_unlocked";
  value: boolean;
}

function collection_to_key_value(documents: State[]) {
  const target = {} as Record<State["_id"], State["value"]>;
  return documents.reduce(function (acc, cur) {
    return Object.assign(acc, { [cur._id ?? ""]: cur?.value });
  }, target);
}

export type State = CoinState | ViewState | UnlockedState | ModeState;

const state = new PouchDB<State>("state");
export const use_state = create_db_hook(state, collection_to_key_value);

async function init() {
  try {
    await state.get("active_coin");
  } catch {
    await state.put({
      _id: "active_coin",
      value: Coins.BTC
    });
  }

  try {
    await state.get("current_mode");
  } catch {
    await state.put({
      _id: "current_mode",
      value: Modes.send
    });
  }

  try {
    await state.get("current_view");
  } catch {
    await state.put({
      _id: "current_view",
      value: Views.home
    });
  }

  try {
    await state.get("wallet_unlocked");
  } catch {
    await state.put({
      _id: "wallet_unlocked",
      value: false
    });
  }
}

init();
