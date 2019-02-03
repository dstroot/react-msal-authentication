import React from "react";
import { AuthConsumer } from "../../components/AuthContext";
// import "./styles.scss";

const Dashboard = () => (
  <AuthConsumer>
    {({ user }) => {
      // let minutes = 1000 * 60;
      // let now = new Date().getTime();
      // let expires = user.idToken.exp * 1000;
      // let timeDiff = expires - now;
      // let time = Math.floor(timeDiff / minutes);
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <h2>User Dashboard</h2>
              <h3>
                User: {user.name} ({user.displayableId})
              </h3>
              {/*<h5>
                Authenticated: {(now < expires).toString()} (expires: {time}{" "}
                minutes)
              </h5>*/}
              <h5>User Object</h5>
              <pre>{JSON.stringify(user, null, 4)}</pre>
            </div>
          </div>
        </div>
      );
    }}
  </AuthConsumer>
);

export default Dashboard;
