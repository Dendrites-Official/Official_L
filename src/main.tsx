import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./styles/fonts.css";
import "@/styles/index.css";
// import SmoothScrollProvider from "./components/SmoothScrollProvider";

// Prevent browser from auto-restoring scroll position on navigation
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <SmoothScrollProvider> */}
        <App />
      {/* </SmoothScrollProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
