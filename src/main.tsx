import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "@atomicjolt/atomic-elements/dist/fonts.css";
import "@atomicjolt/atomic-elements/dist/variables.css";
import "@atomicjolt/atomic-elements/dist/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
