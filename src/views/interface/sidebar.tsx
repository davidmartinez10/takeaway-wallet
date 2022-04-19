import styled from "styled-components";
import { theme } from "../../constants";
import { use_state } from "../../state/state";
import { Modes } from "../../types";

const SidebarContainer = styled.div`
  background-color: ${theme.background_1};
  min-height: 75vh;
  width: 18vw;
  color: ${theme.text};
  display: flex;
  flex-direction: column;
  div {
    align-items: center;
    display: flex;
    padding: 1vmin;
    cursor: pointer;
  }
  div,
  span {
    margin-left: 0.5vw;
    flex-direction: row;
  }
  ul li {
    list-style-type: none;
    font-weight: 400;
    margin: 0.5vh 0px 0px 0.5vw;
  }
  .sub {
    margin-left: 4vw;
    padding: 1vmin;
  }
`;

export function Sidebar() {
  const [state, upsert_state] = use_state();
  const { active_coin, current_view } = state;
  const send_transaction = current_view === Modes.send;
  const send_offline = current_view === Modes.send_offline;
  const sign_message = current_view === Modes.sign_message;
  const verify_message = current_view === Modes.verify_message;

  function change_mode(value: Modes) {
    return function onClick() {
      upsert_state({ _id: "current_mode", value }, true);
    };
  }

  return (
    <SidebarContainer>
      <div style={{ paddingBottom: 0 }} onClick={change_mode(Modes.send)}>
        {/* <img src={send_transaction || send_offline ? send_active : send} alt="send active" /> */}
        <span
          style={{
            color: send_transaction || send_offline ? theme.cbet : theme.text,
          }}
        >
          Send
        </span>
      </div>
      <div
        className="sub"
        style={{ color: send_transaction ? theme.cbet : theme.text }}
        onClick={change_mode(Modes.send)}
      >
        Send Transaction
      </div>
      <div
        className="sub"
        style={{ color: send_offline ? theme.cbet : theme.text }}
        onClick={change_mode(Modes.send_offline)}
      >
        Send Offline
      </div>

      <div
        style={{ paddingBottom: 0 }}
        onClick={change_mode(Modes.sign_message)}
      >
        <span
          style={{
            height: 28,
            width: 28,
            marginLeft: 0,
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <img src={sign_message || verify_message ? message_active : message} alt="message" /> */}
        </span>
        <span
          style={{
            color: sign_message || verify_message ? theme.cbet : theme.text,
          }}
        >
          Message
        </span>
      </div>
      <div
        className="sub"
        style={{ color: sign_message ? theme.cbet : theme.text }}
        onClick={change_mode(Modes.sign_message)}
      >
        Sign Message
      </div>
      <div
        className="sub"
        style={{ color: verify_message ? theme.cbet : theme.text }}
        onClick={change_mode(Modes.verify_message)}
      >
        Verify Message
      </div>
    </SidebarContainer>
  );
}
