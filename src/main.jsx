import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./components/App/App.jsx";
import { HashRouter } from "react-router-dom";
import { RootWrapper } from "./components/SharedLayout/SharedLayout.styled";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <RootWrapper>
        <App />
      </RootWrapper>
    </HashRouter>
  </StrictMode>
);
