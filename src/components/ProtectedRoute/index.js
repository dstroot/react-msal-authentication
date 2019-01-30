import React from "react";
import { Redirect } from "@reach/router";
import { AuthConsumer } from "../AuthContext";

// NOTE: "wait" allows for AuthContext to determine our status
// on page reloads before we do anything. It won't render or
// redirect until we know if the user is authenticated. Otherwise
// we will be immediately redirected to the home page every time.

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
