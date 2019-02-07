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

---

SPA: Challenge with authentication and page refreshes. If a page is refreshed the user is redirected to
the home page as if they were not logged in.

Summary:
A user’s state is Boolean – they are either authenticated or not. Based on that state we should manage
routing and menu options.

1. Routing:

   - They can see and use all “open/unprotected” routes, but
   - Can only use a route that requires authentication (let’s call it a protected route) if they are authenticated. If they attempt the route while logged out they will simply be redirected to the home page where there is a login menu item.

2. Menu/Navigation
   - They should only see links to routes they can access
   - Examples: when not authenticated show “login” and when authenticated show “protected routes” and “logout”

Issue:

When the page is refreshed we lose our current state. If a user is logged in we still default to
“authorized = false”. The Authorization Context component checks in “componentDidMount” to see if
the user is logged in. Several ways to do this:

- Cache both the JWT token and the user information in localstorage. Upon page refresh get the
  JWT token and check the token expiration. If not expired set auth=true and load the user data.
- Cache only the JWT in localstorage. Use the token to retrieve the user’s information – if it
  succeeds and you get a user back you know the token was still good (I kind of like this approach
  because I don’t need to cache the user’s info in localstorage which is not very secure, and it
  proves the token is good). Then set auth = true and load the user data.
  This works but it takes time. By the time it all happens the protected routes component has already
  redirected the user to the home page, however when the auth status is updated the menu will show the
  proper navigation links.

Idea – in auth component have an “authorizing” status and then in the protected route component if we
are in the process of “authorizing” we can basically not do any routing until authorizing is complete.

References

- https://stackoverflowcom/questions/46606877/react-router-v4-wait-for-xhr-authentication-to-transition-to-route
- https://gist.github.com/PierBover/220b2f7d5f790158790d3adb55f0a140
- https://crysislinux.com/limit-access-to-redux-apps-with-higher-order-components/
- https://github.com/ReactTraining/react-router/issues/4962
- https://forums.meteor.com/t/react-router-check-if-used-is-logged-before-rendering/27969/5
- https://scotch.io/tutorials/all-in-one-authentication-and-route-protection-for-a-react-graphql-app
- https://medium.com/the-react-native-log/building-an-authentication-flow-with-react-navigation-fb5de2203b5c
