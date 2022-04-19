import React, { useState } from "react";
import styled from "styled-components";
import ReactSwitch from "react-switch";
import bcrypt from "bcryptjs";
import cryptojs from "crypto-js";
import { theme } from "../../constants";
import { Views } from "../../types";
import {
  CenteredButton,
  Form,
  Line2,
  MnemonicWord,
  Switch,
  Window,
} from "../../components/common";
import { use_state } from "../../state/state";

const Container = styled.div`
  background-color: ${theme.background_2}
  min-height: 75vh;
  padding: 5vmin;
  color: ${theme.text};
  display: flex;
  justify-content: center;
  a {
    color: ${theme.cbet};
    cursor: pointer;
  }
`;

const Container2 = styled.div`
  padding: 3vmin;
  width: 30vw;
  background-color: ${theme.background_1};
  text-align: left;
`;

const AccessLine = styled(Line2)`
  margin: 4vmin 0px;
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

export function AccessWallet() {
  const [state, upsert_state] = use_state();
  const [length, setLength] = useState<12 | 24>(12);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [keepLogin, toggleLogin] = useState(false);
  const [PIN, setPIN] = useState("");

  function change(index: number) {
    return function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      const input = event.target.value;
      const split = input.split(" ");
      if (split.length === 12 || split.length === 24) {
        const obj = {};
        split.forEach((value, key) => {
          //@ts-ignore
          obj[key] = value;
        });
        setInputs(obj);
      } else {
        setInputs({ [index]: input });
      }
    };
  }

  function change_view(value: Views) {
    return function onClick() {
      upsert_state({ _id: "current_view", value }, true);
    };
  }

  return (
    <Container>
      <Window>
        <h2>Access My Wallet</h2>
        <h5>
          Do not have a wallet?{" "}
          <a onClick={change_view(Views.createWallet)}>Create a New Wallet</a>
        </h5>
        <Container2>
          <h2>Access by Mnemonic Phrase</h2>
          <p>Please type in your mnemonic phrase</p>
          <Switch>
            <span
              style={{
                backgroundColor: length === 12 ? theme.cbet : "transparent",
              }}
              onClick={() => setLength(12)}
            >
              12
            </span>
            <span
              style={{
                backgroundColor: length === 24 ? theme.cbet : "transparent",
              }}
              onClick={() => setLength(24)}
            >
              24
            </span>
          </Switch>
          <Form>
            {Array(length)
              .fill(0)
              .map((ignore, index) => {
                return (
                  <MnemonicWord>
                    <span>{index + 1}. </span>
                    <input
                      type="text"
                      key={index}
                      value={inputs[index] || ""}
                    />
                  </MnemonicWord>
                );
              })}
          </Form>
          <AccessLine />
          <label htmlFor="switch">
            <span style={{ color: theme.cbet }}>Keep me logged in</span>
            <span style={{ float: "right" }}>
              <ReactSwitch
                checked={keepLogin}
                onChange={() => toggleLogin(!keepLogin)}
                onColor={theme.cbet}
                handleDiameter={25}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={25}
                width={45}
                className="react-switch"
                id="switch"
              />
            </span>
          </label>
          {keepLogin && (
            <PinInput
              placeholder="Please Enter your PIN"
              pattern="[0-9]*"
              type="password"
              value={PIN}
              onChange={(event) => setPIN(event.target.value)}
            />
          )}
          <AccessLine />

          {
            // @ts-ignore
          }
          <CenteredButton
            onClick={() => {
              const seed = Object.values(inputs).join(" ");
              if (keepLogin) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(PIN, salt);
                const encryptedSeed = cryptojs.AES.encrypt(seed, PIN);
                localStorage.setItem("encryptedseed", String(encryptedSeed));
                localStorage.setItem("pinhash", hash);
              }
              // initWallets(seed);
              change_view(Views.interface)();
            }}
          >
            Continue
          </CenteredButton>
        </Container2>
      </Window>
    </Container>
  );
}
