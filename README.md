# Auth

Authorization has to do several things:

1. It has to his or show certain menu links depending on if your are logged in our not.

```js
import React from "react";
import { AuthConsumer } from "../AuthContext";
import { Link } from "@reach/router";

// AuthConsumer will provide the status of the user
// and login, logout functions.

const Navbar = () => (
  <header>
    <AuthConsumer>
      {({ isAuth, login, logout }) => (
        <div>
          <Link to="/">HOME</Link>

          {/* show protected links or show login button if not logged in */}
          {isAuth ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <button onClick={login}>login</button>
          )}
        </div>
      )}
    </AuthConsumer>
  </header>
);

export default Navbar;
```

2. It has to redirect "protected" links back to login if the user is logged out. We can't allow the user to hit the link directly even if they can't see it on the menu unless they are actually authenticated.

```js
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ isAuth }) =>
      isAuth ? <Component {...rest} /> : <Redirect from="" to="login" noThrow />
    }
  </AuthConsumer>
);

const PublicRoute = ({ component: Component, ...rest }) => (
  <Component {...rest} />
);

// Then you render your routes like this:

<Router>
  <PublicRoute path="/login" component={Login} />
  <PublicRoute path="/signup" component={Signup} />

  <ProtectedRoute path="/" component={Dashboard} />
  <ProtectedRoute path="/dashboard" component={Dashboard} />

  <PublicRoute default component={NotFound} />
</Router>;
```

The Azure portal App registrations (preview) experience has been significantly updated to now include all your applications built with ADAL or MSAL, and to improve usability.

## References

- [MSAL Docs](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-overview)
- [MSAL Example](https://docs.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-javascript-spa)
