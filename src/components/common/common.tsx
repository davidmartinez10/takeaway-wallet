import React from "react";
import styled from "styled-components";
import { theme } from "../../constants";

export const Title = styled.div`
  h2 {
    border-left: 0.5vw solid ${theme.cbet};
    margin: 0;
    padding: 0;
    padding-left: 2vw;
  }

  border-bottom: 1px solid ${theme.background_2};
  padding: 2vh 0;
`;

export const Line = styled.div`
  height: 0px;
  border-bottom: 1px solid ${theme.background_2};
`;

export const Line2 = styled(Line)`
  border-bottom: 1px solid ${theme.text};
`;

export const Button = styled.button`
  color: ${theme.text};
  background-color: ${theme.cta_background};
  border: 0;
  margin: 4vmin;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  padding: 3vmin 10vmin;
`;

export const Result = styled.div`
  border: 1px solid ${theme.cbet};
  text-align: center;
  background-color: transparent;
  color: ${theme.cbet};
  box-sizing: border-box;
  padding: 5vmin;
  border-radius: 4px;
  margin: 0px 5vmin;
`;

export const Message = styled.textarea`
  outline: none;
  color: ${theme.text};
  background-color: ${theme.background_2};
  border: 0;
  border-radius: 4px;
  height: 20vh;
  min-width: 70vw;
  padding: 13px 15px;
  resize: none;
  box-sizing: border-box;
  margin: 2vmin 5vmin;
`;

export const Window = styled.div`
  align-self: center;
  text-align: center;
`;

export const Switch = styled.div`
  background-color: gray;
  color: ${theme.background_1};
  border-radius: 34px;
  width: 12%;
  height: 4vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    padding: 1px;
    line-height: 3.5vh;
    font-size: 1.7vmin;
    border-radius: 34px;
    height: 3vh;
    width: 3vh;
  }
  margin: 2vmin 0vmin;
`;

export const Form = styled.div`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  width: 30vw;
  justify-content: space-around;
`;

export const MnemonicWord = styled.div`
  border-bottom: 1px solid ${theme.text};
  width: 8vw;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  padding: 1vmin 0.5vmin 0 0.5vmin;
  input {
    border: 0;
    outline: none;
    float: right;
    height: 3vh;
    width: 6vw;
    color: ${theme.text};
    background-color: ${theme.background_2};
    border-radius: 4px;
  }
  input:disabled {
    background-color: ${theme.background_1};
  }
`;

export function CenteredButton(props: React.HTMLProps<HTMLButtonElement>) {
  return (
    <div style={{ textAlign: "center" }}>
      {
        //@ts-ignore
      } <Button {...props} />
    </div>
  );
}
