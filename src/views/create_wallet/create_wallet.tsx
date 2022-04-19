import React, { useState } from "react";
import styled from "styled-components";
import * as bip39 from "bip39";
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
  padding: 5vmin;
  background-color: ${theme.background_2};
  color: ${theme.text};
  min-height: 60vh;
  a {
    color: ${theme.cbet};
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
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

export function CreateWallet() {
  const [, upsert_state] = use_state();
  const [step, setStep] = useState(0);
  const [length, setLength] = useState<12 | 24>(12);

  function change(index: number) {
    return function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      const input = event.target.value;
      const split = input.split(" ");
      if (split.length === 12 || split.length === 24) {
        const obj = {};
        split.forEach((value, key) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          obj[key] = value;
        });
        setVerif(obj);
      } else {
        setVerif({ [index]: input });
      }
    };
  }

  function change_view(value: Views) {
    return function onClick() {
      upsert_state({ _id: "current_view", value }, true);
    };
  }

  const mnemonic = bip39.generateMnemonic(length === 12 ? 128 : 256);
  const inputs = mnemonic.split(" ");
  const verification = inputs.slice();
  const empty: number[] = [];

  const [verif, setVerif] = useState<{ [key: string]: string }>({});

  while (verification.reduce((p, c) => p + Number(c === ""), 0) < 5) {
    // tslint:disable-next-line:no-operator-on-type
    const k = Math.floor(Math.random() * (length - 1));
    verification[k] = "";
    empty.push(k);
  }

  return (
    <Container>
      <Window>
        <h2>Get a New Wallet</h2>
        <h5>
          Already have a wallet?{" "}
          <a onClick={change_view(Views.accessWallet)}>Access My Wallet</a>
        </h5>
        <Container2>
          {step === 0 && (
            <>
              <h2>Access by Mnemonic Phrase</h2>
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
                      <MnemonicWord key={index}>
                        <span>{index + 1}. </span>
                        <input
                          disabled
                          type="text"
                          key={index}
                          value={inputs[index] || ""}
                        />
                      </MnemonicWord>
                    );
                  })}
              </Form>

              <AccessLine />
              <p style={{ color: theme.cbet, textAlign: "right" }}>
                Keep me logged in
              </p>
              <AccessLine />

              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
              }
              <CenteredButton
                onClick={() => {
                  setStep(1);
                }}
              >
                I Wrote Down My Mnemonic Phrase
              </CenteredButton>
            </>
          )}
          {step === 1 && (
            <>
              <h2>Verification</h2>
              <h5>
                Please enter and fill out the empty boxes below to verify your
                mnemonic phrase key.
              </h5>
              <Form>
                {Array(length)
                  .fill(0)
                  .map((ignore, index) => {
                    const disabled = !empty.includes(index);
                    return (
                      <MnemonicWord key={index}>
                        <span>{index + 1}. </span>
                        <input
                          disabled={disabled}
                          type="text"
                          key={index}
                          value={verif[index] || ""}
                          onChange={change(index)}
                        />
                      </MnemonicWord>
                    );
                  })}
              </Form>
              <CenteredButton>Verify</CenteredButton>
            </>
          )}
        </Container2>
      </Window>
    </Container>
  );
}
