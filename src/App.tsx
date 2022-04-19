import styled from "styled-components";
import { use_state } from "./state/state";
import React from "react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Views } from "./types";
import { Home } from "./views/home";
import { Interface } from "./views/interface";

const Main = styled.div`
  text-align: left;
  font-family: Helvetica;
  font-size: 2.2vmin;
`;

function Layout() {
  const [state] = use_state();
  const { current_view } = state;

  return (
    <Main>
      <Header />
      {current_view === Views.home && <Home />}
      {current_view === Views.interface && <Interface />}
      {/* {current_view === Views.createWallet && <CreateWallet />}
      {current_view === Views.accessWallet && <AccessWallet />} */}
      <Footer />
    </Main>
  );
}

export default function App() {
  return (
    <React.StrictMode>
      <Layout />
    </React.StrictMode>
  );
}
