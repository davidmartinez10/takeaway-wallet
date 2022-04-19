import styled from "styled-components";
import { theme } from "../../constants";
import { use_state } from "../../state/state";
import { Coins, Views } from "../../types";

const Div = styled.div`
  img {
    height: 6vh;
    margin: 2vh 2vw;
  }
  button {
    outline: none;
    background-color: ${theme.background_2};
    color: ${theme.text};
    border: 0;
    -moz-border-radius: 0px;
    -webkit-border-radius: 6px 6px 0px 0px;
    border-radius: 6px 6px 0px 0px;
    height: 5vh;
    margin-top: 5vh;
    width: 12vw;
  }
`;

const Grid = styled.div`
  background-color: ${theme.background_1};
  height: 10vh;
  text-align: center;
  display: flex;
  flex-direction: row;
  position: -webkit-sticky;
  position: sticky;
  top: 0;

  #nav {
    color: white;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    align-self: center;
  }
`;

export function Header() {
  const [state, upsert_state] = use_state();
  const { active_coin, current_view } = state;

  function change_view(value: Views) {
    return function onClick() {
      upsert_state({ _id: "current_view", value }, true);
    };
  }

  function change_coin(value: Coins) {
    return function onClick() {
      upsert_state({ _id: "active_coin", value }, true);
    };
  }

  return (
    <Grid>
      <Div
        style={{
          width: "18vw",
          borderBottom: `1px solid ${theme.background_2}`,
        }}
        onClick={change_view(Views.home)}
      >
        {/* <img src={logo} alt="CBET" /> */}
      </Div>
      <Div>
        {current_view === Views.interface &&
          Object.values(Coins).map(function map(coin) {
            return (
              <button
                onClick={change_coin(coin)}
                style={{
                  backgroundColor:
                    active_coin === coin
                      ? theme.background_2
                      : theme.background_1,
                }}
              >
                {coin}
              </button>
            );
          })}
      </Div>
      {/* <div id="nav">
        Transaction History
      </div> */}
    </Grid>
  );
}
