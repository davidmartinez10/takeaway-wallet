import styled from "styled-components";
import { theme } from "../../constants";

const Div = styled.div`
  background-color: ${theme.background_1};
  min-height: 20vh;
`;

export function Footer() {
  return <Div></Div>;
}
