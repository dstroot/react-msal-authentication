import React from "react";
import { AuthConsumer } from "../../components/AuthContext";

const Dashboard = () => {
  let now = new Date().getTime();
  // let expires = new Date(user.idToken.exp * 1000).getTime();
  // let timeDiff = Math.abs(now - expires);
  // let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <AuthConsumer>
      {({ user }) => (
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <h2>User Dashboard</h2>
              <h3>User: {user.name}</h3>
              <h3>Email: {user.displayableId}</h3>
              <h3>Expires: {user.idToken.exp * 1000}</h3>
              <h3>Expires: {now}</h3>
              <h3>
                Authenticated: {(now < user.idToken.exp * 1000).toString()}
              </h3>
              <h4>User Object</h4>
              <pre>{JSON.stringify(user)}</pre>
            </div>
          </div>
        </div>
      )}
    </AuthConsumer>
  );
};

export default Dashboard;
