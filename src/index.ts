import React from "react";
import react_dom from "react-dom/client";
import app from "./app";

const root = document.createElement("div");
document.body.appendChild(root);
react_dom.createRoot(root).render(React.createElement(app));
