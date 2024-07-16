import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { localBD } from "./bd/localBD.js";
import data from "./bd/videos-example.js";
import "./main.module.css";

const bd = new localBD("aluraFlix");

if (bd.getLastID === 0) {
  bd.importData(data);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

//<React.StrictMode></React.StrictMode>
