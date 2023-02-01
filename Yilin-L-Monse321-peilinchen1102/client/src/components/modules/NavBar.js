import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";
//import "../pages/Profile.js";

// This identifies your web application to Google's authentication service

/**
 * The navigation bar at the top of all pages. Takes no props.
 */

const GOOGLE_CLIENT_ID =
  "1049616733722-notbqgnv9e1lltvj6567dmtfgr0f3nfp.apps.googleusercontent.com";
/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = ({ userId, handleLogin, handleLogout }) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">cONNECT</div>
      <div className="NavBar-linkContainer u-inlineBlock">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        {userId && (
          <Link to={`/profile/${userId}`} className="NavBar-link">
            Profile
          </Link>
        )}
        <Link to={`/feed`} className="NavBar-link">
          Feed
        </Link>
        {/* <Link to={`/todo`} className="NavBar-link">
          Career Goal
        </Link> */}

        {userId ? (
          <GoogleLogout
            className="u-flex-right"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            className="u-flex-right"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            isSignedIn
            onSuccess={handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
