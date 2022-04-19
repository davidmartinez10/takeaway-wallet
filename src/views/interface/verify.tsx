import React, { useState } from "react";
import styled from "styled-components";
import {
  CenteredButton,
  Message,
  Result,
  Title,
} from "../../components/common";
import { theme } from "../../constants";
import { use_state } from "../../state/state";
import { Coins, Signature } from "../../types";

const VerifyContainer = styled.div`
  background-color: ${theme.background_1};
  margin: 4vmin 0 4vmin 4vmin;
  border-radius: 6px;
  min-height: 50vh;
  box-sizing: border-box;

  h4 {
    color: ${theme.text};
    padding: 0 5vmin;
    margin-bottom: 0;
  }
`;

export function VerifyMessage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [state] = use_state();
  const { active_coin } = state;
  // const { verifySignature } = wallets_map.get(active_coin as Coins)!;

  return (
    <VerifyContainer>
      <Title>
        <h2>Verify Message</h2>
      </Title>
      <h4>Signature</h4>
      <Message
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      {result && <Result>{result}</Result>}
      <CenteredButton
        onClick={() => {
          const signature: Signature = JSON.parse(message);
          // if (verifySignature(signature)) {
          //   const { address, msg } = signature;
          //   setResult(`${address} did sign the message: ${msg}`);
          // } else {
          //   setResult("");
          // }
        }}
      >
        Sign
      </CenteredButton>
    </VerifyContainer>
  );
}
