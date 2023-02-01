import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";
import Profile from "./pages/Profile.js";
import Feed from "./pages/Feed.js";
import Chatbook from "./pages/Chatbook.js";
import TodoList from "./pages/TodoList.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import { UserTokenContext } from "../context/userToken";
import { useGoogleLogin } from "react-google-login";

/**
 * Define the "App" components
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userToken, setUserToken] = useState();
  // const { loaded } = useGoogleLogin({
  //   clientId: "1049616733722-najqllsek79dmquq5qar18a84ite36hp.apps.googleusercontent.com",
  // });

  const [isLoading, setIsLoading] = useState(true);

  // console.log({ loaded });

  // useEffect(() => {
  //   get("/api/whoami").then((user) => {
  //     if (user._id) {
  //       // they are registed in the database, and currently logged in.
  //       setUserId(user._id);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogin = (res) => {
    setIsLoading(true);

    const userToken = res.tokenObj.id_token;

    setUserToken(userToken);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setIsLoading(false);
    });
    // st("/api/initsocket", { socketid: socket.id });
  };

  const handleLogout = () => {
    setUserToken();
    setUserId();
    post("/api/logout");
  };

  return (
    <>
      <UserTokenContext.Provider value={userToken}>
        <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />

        {!isLoading && (
          // <>
          <Router>
            <Skeleton
              path="/"
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              userId={userId}
            />
            <Profile path="/profile/:userId" />
            <Feed path="/feed" userId={userId} />
            <Chatbook path="/chat" userId={userId} />
            <TodoList path="/todo" userId={userId} />
            <NotFound default />
          </Router>
          // </>
        )}
      </UserTokenContext.Provider>
    </>
  );
};

export default App;
