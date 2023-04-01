import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./containers/App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <AuthProvider>
      <Router>
        {/* <Route path="/" component={App} /> */}
        <Route path="/">
          <App />
        </Route>
      </Router>
    </AuthProvider>
  </CookiesProvider>
);
