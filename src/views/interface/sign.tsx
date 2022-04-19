import { useState } from "react";
import styled from "styled-components";
import { Title, CenteredButton, Message } from "../../components/common";
import { theme } from "../../constants";
import { use_state } from "../../state/state";
import { Coins } from "../../types";

const SignContainer = styled.div`
  background-color: ${theme.background_1};
  margin: 4vmin 0 4vmin 4vmin;
  border-radius: 6px;
  min-height: 50vh;
  box-sizing: border-box;

  p {
    color: ${theme.text};
    padding: 5vmin;
  }
  h4 {
    color: ${theme.text};
    padding: 0 5vmin;
    margin-bottom: 0;
  }
`;

export function SignMessage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [state] = use_state();
  const { active_coin } = state;
  // const { signMessage } = wallets_map.get(active_coin as Coins)!;

  return (
    <SignContainer>
      <Title>
        <h2>Sign Message</h2>
      </Title>
      <p>
        Include your nickname and where you use the nickname so someone else
        cannot use it. Include a specific reason for the message so it cannot be
        reused for a different purpose.
      </p>
      <h4>Message</h4>
      <Message
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      {result && (
        <>
          <h4>Signature</h4>
          <Message value={result} disabled />
        </>
      )}
      <CenteredButton
      // onClick={() => setResult(JSON.stringify(signMessage(message)))}
      >
        Sign
      </CenteredButton>
    </SignContainer>
  );
}
