import React from "react";
import * as Msal from "msal";

// MSAL Configuration
const applicationConfig = {
  clientID: process.env.REACT_APP_MSFT_CLIENTID,
  authority: process.env.REACT_APP_MSFT_AUTHORITY,
  graphScopes: ["user.read"],
  graphEndpoint: "https://graph.microsoft.com/v1.0/me"
};

// Instantiate MSAL object
const myMSALObj = new Msal.UserAgentApplication(
  applicationConfig.clientID,
  applicationConfig.authority,
  { storeAuthStateInCookie: true, cacheLocation: "localStorage" }
);

// Create AuthContext
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    authenticated: false,
    wait: true,
    user: {}
  };

  componentDidMount = () => {
    // check if we have a user already
    const user = myMSALObj.getUser();
    if (user) {
      this.setState({ authenticated: true, user: user });
    }
    this.setState({ wait: false });
  };

  // using MSAL loginPopup method
  login = () => {
    myMSALObj.loginPopup(applicationConfig.graphScopes).then(idToken => {
      const user = myMSALObj.getUser();
      this.setState({ authenticated: true, user: user, wait: false });
    });
  };

  logout = () => {
    sessionStorage.clear();
    this.setState({ authenticated: false, user: {}, wait: false });
    // myMSALObj.logout(); // this fully logs you out from MSFT
  };

  render = () => {
    return (
      <AuthContext.Provider
        value={{
          authenticated: this.state.authenticated,
          wait: this.state.wait,
          user: this.state.user,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  };
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
