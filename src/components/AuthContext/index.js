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
  constructor() {
    super();
    this.state = {
      authenticated: false,
      wait: true,
      user: {},
      error: ""
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    // this.checkAuthentication = this.checkAuthentication.bind(this);
  }

  componentDidMount() {
    // simpler - just check if we have a user!
    const user = myMSALObj.getUser();
    if (user) {
      this.setState({ authenticated: true, user: user });
    }

    this.setState({ wait: false });

    // this.checkAuthentication();
  }

  // checkAuthentication() {
  //   const token = sessionStorage.getItem("msal.idtoken");
  //
  //   // In some cases you may just want to see if your token expired.
  //   // isAuthenticated() {
  //   //   // Check whether the current time is past the token's expiry
  //   //   let now = new Date().getTime()
  //   //   let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  //   //   return now < expiresAt;
  //   // }
  //
  //   if (token) {
  //     const user = myMSALObj.getUser();
  //     if (user) {
  //       this.setState({ authenticated: true, user: user });
  //     }
  //   }
  //
  //   this.setState({ wait: false });
  // }

  // use MSAL loginPopup method
  login() {
    myMSALObj
      .loginPopup(applicationConfig.graphScopes)
      .then(
        idToken => {
          //Login Success
          this.setState({ authenticated: true });

          // get user information
          const user = myMSALObj.getUser();
          this.setState({ user: user, wait: false });
        },
        error => {
          console.log("here: " + error); // Error!
        }
      )
      .catch(error => {
        console.error("onRejected function called: " + error.message);
      });
  }

  // use MSAL logout method
  logout() {
    this.setState({ authenticated: false });
    sessionStorage.clear();
    // myMSALObj.logout();  // this fully logs you our from MSFT
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          authenticated: this.state.authenticated,
          wait: this.state.wait,
          user: this.state.user,
          error: this.state.error,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
