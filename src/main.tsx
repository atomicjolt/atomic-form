import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SensibleDefaults } from "@atomicjolt/atomic-elements";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SensibleDefaults />
    <App />
  </React.StrictMode>
);
