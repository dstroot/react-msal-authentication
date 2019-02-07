// create a test user
const user = {
  displayableId: "dan@msft.com",
  name: "User Name",
  identityProvider: "https://login.microsoftonline.com/v2.0",
  userIdentifier: "identfierstring",
  idToken: {
    aud: "uniquestring",
    iss: "https://login.microsoftonline.com/v2.0",
    iat: 1549125156,
    nbf: 1549125156,
    exp: 1549129056,
    aio: "anotheruniquestring",
    name: "User Name",
    nonce: "string",
    oid: "string",
    preferred_username: "dan@msft.com",
    sub: "string",
    tid: "string",
    uti: "striung",
    ver: "2.0"
  }
};

// create mock context data to use for our test
const context = {
  authenticated: true,
  wait: false,
  user: user,
  login: jest.fn(),
  logout: jest.fn()
};

export default context;
