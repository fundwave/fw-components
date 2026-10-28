import React from "react";
import ReactDOM from "react-dom/client";
import { styles as dataGridStyles } from "@fw-components/data-grid/styles";
import App from "./App";
import "./index.css";

const dataGridStyleTag = document.createElement("style");
dataGridStyleTag.textContent = dataGridStyles;
document.head.appendChild(dataGridStyleTag);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
