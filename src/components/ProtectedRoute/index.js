import React from "react";
import { Redirect } from "@reach/router";
import { AuthConsumer } from "../AuthContext";

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
