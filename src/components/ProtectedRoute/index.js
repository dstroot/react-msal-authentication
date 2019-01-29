import React from "react";
import { Redirect } from "@reach/router";
import { AuthConsumer } from "../AuthContext";

// NOTE: "wait" allows for AuthContext to determine if we are already
// logged in on page refreshes. Otherwise we will be immediately
// redirected to the home page.

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ authenticated, wait }) =>
      wait ? null : authenticated ? (
        <Component {...rest} />
      ) : (
        <Redirect from="" to="/" noThrow />
      )
    }
  </AuthConsumer>
);

export const PublicRoute = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);
