import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import io from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3001";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // test for socketio
  const [messageFromServer, setMessageFromServer] = useState("No Message");

  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("testFromServer", (data) => {
      setMessageFromServer(data);
    });
  }, []);

  const usernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = (e) => {
    const socket = io(ENDPOINT);
    socket.emit("testFromClient", "hello from client");
  };

  const login = () => {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-type": "Application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.message) {
          console.log("message from data response", data.message);
        } else {
          props.logInUser(data);
          // alert('Login successful');
          props.history.push("/game");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="signLogIn">
      <h1>{messageFromServer}</h1>
      <button onClick={handleClick}>Send message to server</button>
      <h2>Login</h2>
      <form>
        <label>Username: </label>
        <input type="text" value={username} onChange={usernameOnChange} />
        <label>Password: </label>
        <input type="password" value={password} onChange={passwordOnChange} />
      </form>
      <div className="buttons">
        <button onClick={login}>Log-in</button>
        <Link to={`/signup`}>
          <button type="button" className="buttons">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Login);
