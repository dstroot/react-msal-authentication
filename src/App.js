import React from "react";
import { Router } from "@reach/router";

// Authorization
import {
  AuthProvider,
  ProtectedRoute,
  PublicRoute
} from "./components/Authorization";

// components
import Navbar from "./components/Navbar";
import "./scss/main.scss";

// pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FourOhFour from "./pages/FourOhFour";

const App = () => (
  <div>
    <AuthProvider>
      <Navbar />
      <Router>
        <PublicRoute path="/" component={Home} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <PublicRoute default component={FourOhFour} />
      </Router>
    </AuthProvider>
  </div>
);

export default App;
