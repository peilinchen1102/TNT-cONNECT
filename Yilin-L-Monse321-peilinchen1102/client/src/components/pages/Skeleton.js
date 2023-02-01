import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "../../utilities.css";
import "./Skeleton.css";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Adamina&family=Indie+Flower&display=swap');
</style>;
//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID =
  "1049616733722-notbqgnv9e1lltvj6567dmtfgr0f3nfp.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <>
      <h1 className="font-extrabold u-textCenter text-5xl animate-bounce h-6">
        Welcome to cONNECT!
      </h1>

      <p className="u-textCenter text-2xl">Login to view your Profile</p>
      <div className="Profile-logo" />
    </>
  );
};

export default Skeleton;
