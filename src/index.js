import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./components/AuthContext"; // Importa AuthProvider

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <AuthProvider>
        {" "}
        {/* Envuelve App con AuthProvider */}
        <App />
      </AuthProvider>
    </Auth0Provider>
  </React.StrictMode>
);
