import React from "react";
import reportWebVitals from "./reportWebVitals";
import react_dom from "react-dom/client";
import app from "./app";

react_dom
  .createRoot(document.getElementById("root")!)
  .render(React.createElement(app));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
