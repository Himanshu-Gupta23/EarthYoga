import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css"; // Optional, add global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="earthyoga.jp.auth0.com"
    clientId="Mn3V7JSODGwHxL6a6CVOGkeEMpd4iGIB"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
);
