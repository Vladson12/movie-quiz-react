import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./containers/App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </AuthProvider>
);
