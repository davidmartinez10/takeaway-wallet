import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../constants";
import { Views } from "../../types";
// import bcrypt from "bcryptjs";
// import cryptojs from "crypto-js";
import { CenteredButton } from "../../components/common";
import { use_state } from "../../state/state";

const HomeContainer = styled.div`
  background-color: ${theme.background_2};
  min-height: 70vh;
  color: ${theme.text};
  font-weight: 700;
  padding: 4vmin 4vmin;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  flex-direction: column;
  div {
    flex-direction: row;
  }
`;

const Grid = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Create = styled.button`
  outline: none;
  margin: 3vmin;
  padding: 2vmin 2.5vmin;
  height: 35vmin;
  width: 60vmin;
  color: ${theme.text}
  background-color: ${theme.cta_background};
  border: solid ${theme.cta_background} 1px;
`;

const Access = styled.button`
  outline: none;
  margin: 3vmin;
  padding: 1vmin 1.5vmin;
  height: 35vmin;
  width: 60vmin;
  color: black;
  background-color: ${theme.cbet};
  border: solid ${theme.cbet} 1px;
`;

const CardGrid = styled.div`
  align-items: center;
  display: flex;
  text-align: left;
  img {
    height: 10vmin;
    padding-right: 2vw;
  }
  div {
    display: flex;
    flex-direction: column;
  }
`;
const Unlock = styled.div`
  padding: 3vmin;
  width: 30vw;
  background-color: ${theme.background_1};
  text-align: left;
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
`;

const PinInput = styled.input`
  color: #fff;
  border-radius: 4px;
  outline: none;
  background-color: ${theme.background_2};
  width: 100%;
  line-height: 1.5;
  border: 0;
  padding: 2vmin 9vmin 2vmin 3vmin;
  box-sizing: border-box;
`;

export function Home() {
  const [state, upsert_state] = use_state();
  const { active_coin, current_view } = state;
  const [PIN, setPIN] = useState("");

  function change_view(value: Views) {
    return function onClick() {
      upsert_state({ _id: "current_view", value }, true);
    };
  }
  return (
    <HomeContainer>
      {localStorage.getItem("encryptedseed") ? (
        <Unlock>
          <h2>User created PIN code</h2>
          <p>Please enter your PIN to unlock your balance.</p>
          <PinInput
            placeholder="Please Enter your PIN"
            pattern="[0-9]*"
            type="password"
            value={PIN}
            onChange={(event) => setPIN(event.target.value)}
          />
          <CenteredButton
            onClick={() => {
              // const hash = localStorage.getItem("pinhash");
              // if (bcrypt.compareSync(PIN, hash ?? "")) {
              //   const seed = cryptojs.AES.decrypt(
              //     localStorage.getItem("encryptedseed")!,
              //     PIN
              //   ).toString(cryptojs.enc.Utf8);
              //   // initWallets(seed);
              //   upsert_state(
              //     { _id: "current_view", value: Views.interface },
              //     true
              //   );
              // } else {
              //   localStorage.removeItem("encryptedseed");
              //   localStorage.removeItem("pinhash");
              //   setPIN("");
              // }
            }}
          >
            Unlock
          </CenteredButton>
        </Unlock>
      ) : (
        <>
          <div>
            <h1>CryptoBet Safe & Secure Web Wallet</h1>
            <p>
              The CBET web wallet is your interface to the CBET blockchain,
              letting you send and receive CBET coins obtained from gameplay at
              CryptoBet.
            </p>
          </div>
          <Grid>
            <Create onClick={change_view(Views.createWallet)}>
              <CardGrid>
                {/* <img src={create} alt="Create wallet" /> */}
                <div>
                  <h2>Create A New Wallet</h2>
                  <p>
                    First, setup your wallet. You will need to create a CBET
                    wallet address and private key (be sure to save this key in
                    a secure place!) in order to receive your CBET Player
                    Rewards.
                  </p>
                  <p>Get Started</p>
                </div>
              </CardGrid>
            </Create>
            <Access onClick={change_view(Views.interface)}>
              <CardGrid>
                {/* <img src={unlock} alt="Access wallet" /> */}
                <div>
                  <h2>Access My Wallet</h2>
                  <p>
                    This is where your CBET Player Rewards are sent. You can
                    trade them to others or cash them in for gameplay credits
                    (more options coming soon!).
                  </p>
                  <p>Access Now</p>
                </div>
              </CardGrid>
            </Access>
          </Grid>
        </>
      )}
    </HomeContainer>
  );
}
