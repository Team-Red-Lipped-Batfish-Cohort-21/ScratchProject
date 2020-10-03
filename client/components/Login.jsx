import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const Login = (props) => {
  // console.log("props in Login are", props);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameOnChange = (e) => {
    // console.log("e.target of username", e.target.value);
    setUsername(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    // console.log("username", username);
    // console.log("password", password);
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
          console.log(data.message);
          alert(data.message);
          // props.history.push("/");
        } else {
          // console.log(data);
          // data = { username: 'name', highscore: #}  state ={ ...state}
          // redirect to game page?
          // const newState = { ...props.state, user: { data } };
          // console.log(props);
          // this.setState(newState);
          const user = data;
          props.logInUser(user);
          console.log("Login successful");
          props.history.push("/game");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const message = data.message ? data.message : "";

  return (
    <div className='login'>
      This is Login
      <form>
        <label>Username: </label>
        <input type='text' value={username} onChange={usernameOnChange} />
        <label>Password: </label>
        <input type='text' value={password} onChange={passwordOnChange} />
      </form>
      <button onClick={login}>Log-in</button>
      {/* check if {data.message is truthy} */}
      {/* <p>{message}</p> */}
      <Link to={`/Signup`}>
        <button type='button' className='btnSecondary'>
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default withRouter(Login);
