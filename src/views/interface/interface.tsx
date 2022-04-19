import styled from "styled-components";
import { theme } from "../../constants";
import Blockies from "react-blockies";
import { Coins, Modes } from "../../types";
import { use_state } from "../../state/state";
import { Send } from "./send";

const Div = styled.div`
  background-color: ${theme.background_2};
  min-height: 75vh;
  color: ${theme.text};
  display: flex;
  flex-direction: row;
`;

const CenterBlock = styled.div`
  width: 78vw;
`;

const Card = styled.div`
  background-color: ${theme.background_1};
  padding: 4vmin;
  margin: 0 4vmin 0 0;
  border-radius: 6px;
  h2 {
    margin: 0;
  }
  p {
    color: ${theme.cbet};
    margin: 0;
    margin-bottom: 3vh;
  }
`;

const Grid = styled.div`
  text-align: center;
  padding: 4vmin 0px 0px 4vmin;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const CardGrid = styled.div`
  align-items: center;
  display: flex;
  text-align: left;
  img,
  canvas {
    height: 10vmin !important;
    width: 10vmin !important;
    align-self: center;
  }
  div {
    display: flex;
    flex-direction: column;
    img {
      height: 3vh !important;
      padding-right: 0;
      align-self: flex-start;
    }
  }
`;

export function Interface() {
  const [state] = use_state();
  const { active_coin, current_mode } = state;
  // const [live_wallets] = use_wallets();
  // // @ts-ignore
  // const { balance } = live_wallets;
  // const { address } = wallets_map.get(active_coin as Coins)!;
  return (
    <Div>
      {/* <Sidebar /> */}
      <CenterBlock>
        <Grid>
          <Card>
            <CardGrid>
              <div
                style={{
                  height: "10vmin",
                  marginRight: "2vw",
                  borderRadius: 10,
                  border: "0.5vmax solid white",
                }}
              >
                {/* <Blockies seed={address} scale={5} /> */}
              </div>
              <div>
                <h2>Address</h2>
                {/* <p>{address}</p> */}
              </div>
            </CardGrid>
          </Card>
          <Card>
            <CardGrid>
              {/* <img
                src={wallet_icon}
                alt="Balance"
                style={{ marginRight: "2vw" }}
              /> */}
              <div>
                <h2>Balance</h2>
                <p>
                  {/* {balance} {active_coin} */}
                </p>
                {/* <img onClick={async () => balance.set(await getBalance() as string)} src={refresh} alt="Refresh balance" /> */}
              </div>
            </CardGrid>
          </Card>
        </Grid>
        {current_mode === Modes.send && <Send />}
        {/* {current_mode === Modes.send_offline}
        {current_mode === Modes.sign_message && <SignMessage />}
        {current_mode === Modes.verify_message && <VerifyMessage />} */}
      </CenterBlock>
    </Div>
  );
}
