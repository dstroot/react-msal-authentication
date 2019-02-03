import React, { useState, useRef } from "react";
import { AuthConsumer } from "../AuthContext";
import { Link } from "@reach/router";
import logo from "./media/hatchlogo.png";
import "./styles.scss";

// isCurrent - true if the location.pathname is exactly the same as the anchor’s href.
const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: "active nav-link" }
    : { className: "nav-link" };
};

// `getProps` Calls up to you to get props for the underlying anchor element.
// Useful for styling the anchor as active.
const ExactNavLink = props => <Link getProps={isActive} {...props} />;

// AuthConsumer will provide the status of the user
// and login, logout functions.

const Navbar = () => {
  const [hidden, setHidden] = useState(true);
  const [buttonClasses, setButtonClasses] = useState(
    "navbar-toggler collapsed"
  );
  const [dropdownClasses, setDropdownClasses] = useState(
    "navbar-collapse collapse"
  );

  const buttonRef = useRef(null);

  const toggleHidden = () => {
    buttonRef.current.blur();
    setHidden(!hidden);

    if (hidden) {
      setButtonClasses("navbar-toggler collapsed");
    } else {
      setButtonClasses("navbar-toggler");
    }

    if (hidden) {
      setDropdownClasses("navbar-collapse collapse");
    } else {
      setDropdownClasses("navbar-collapse collapse show");
    }
  };

  return (
    <AuthConsumer>
      {({ authenticated, login, logout }) => (
        <nav className="navbar fixed-top navbar-expand-sm navbar-light bg-light">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img
                className="d-inline-block align-middle"
                src={logo}
                height="35"
                alt="Pacific Life"
              />
            </Link>

            <button
              className={buttonClasses}
              type="button"
              aria-label="Toggle navigation"
              onClick={toggleHidden}
              ref={buttonRef} // get a reference to the button
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className={dropdownClasses}>
              <ExactNavLink to="/" onClick={toggleHidden}>
                Home
              </ExactNavLink>

              {/* show protected links or show login button if not logged in */}
              {authenticated ? (
                <>
                  <ExactNavLink to="/dashboard" onClick={toggleHidden}>
                    Dashboard
                  </ExactNavLink>
                  <button
                    className="btn btn-outline-primary my-2 my-sm-0"
                    onClick={logout}
                  >
                    logout
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-outline-primary my-2 my-sm-0"
                  onClick={login}
                >
                  login
                </button>
              )}
            </div>
          </div>
        </nav>
      )}
    </AuthConsumer>
  );
};

export default Navbar;
