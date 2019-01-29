import React from "react";
import { Router } from "@reach/router";

// context
import { AuthProvider } from "./components/AuthContext";

// components
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
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
