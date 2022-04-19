import { useState } from "react";
import styled from "styled-components";
import { CenteredButton, Line, Title } from "../../components/common";
import { theme } from "../../constants";
import { use_state } from "../../state/state";
import { use_wallets, wallets_map } from "../../state/wallets";
import { Coins } from "../../types";

const SendTransaction = styled.div`
  background-color: ${theme.background_1};
  margin: 4vmin 0 4vmin 4vmin;
  border-radius: 6px;
  min-height: 50vh;

  p {
    color: ${theme.cbet};
    padding: 0 1.6vmin;
  }

  .form {
    padding: 5vmin;
    box-sizing: border-box;

    h4 {
      margin: 0;
      margin-bottom: 3vh;
    }
    div {
      margin-bottom: 3vh;
    }

    input {
      color: #fff;
      border-radius: 4px;
      outline: none;
      background-color: ${theme.background_2};
      width: 100%;
      line-height: 1.5;
      border: 0;
      padding: 2vmin 9vmin 2vmin 3vmin;
      box-sizing: border-box;
    }

    #submit {
      text-align: center;
    }

    #tx-result {
      text-align: center;
      background-color: lightgreen;
      color: black;
      box-sizing: border-box;
      padding: 8vmin;
    }
  }
`;

export function Send() {
  const [state] = use_state();
  const { active_coin } = state;
  const [toAddress, setToAddress] = useState("");
  // const [fee, setFee] = useState("-");
  const [value, setValue] = useState("");
  const [hash, setHash] = useState();

  const [live_wallets] = use_wallets();
  // @ts-ignore
  const { balance } = live_wallets;
  const wallet = wallets_map.get(active_coin as Coins)!;
  const { getBalance, getFee } = wallet;

  // useEffect(() => {
  //   (async function () {
  //     if (value && toAddress) setFee(await getFee({ value, to: toAddress }));
  //   }());
  // }, [value, toAddress, getFee]);

  return (
    <SendTransaction>
      <Title>
        <h2>Send Transaction</h2>
      </Title>
      <div className="form">
        <div>
          <h4>Amount</h4>
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div>
          <h4>To Address</h4>
          <input
            type="text"
            value={toAddress}
            onChange={(event) => setToAddress(event.target.value)}
          />
        </div>
        <div>
          <h4>Transaction Fee</h4>
          <p id="fee">
            {/* {fee} {active_coin === Coins.ETH ? "Gwei" : active_coin} */}
          </p>
        </div>
        <div>
          <Line />
          <h4>Advanced</h4>
          <Line />
        </div>
        <div id="submit">
          <CenteredButton
            onClick={() => {
              // wallet
              //   .sendTransaction({ to: toAddress, value })
              //   .then((tx_hash: any) => setHash(tx_hash));
            }}
          >
            Send Transaction
          </CenteredButton>
        </div>
        {hash && <div id="tx-result">Transaction hash: {hash}</div>}
      </div>
    </SendTransaction>
  );
}
