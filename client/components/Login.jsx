import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'Application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          props.logInUser(data);
          alert('Login successful');
          props.history.push('/game');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="signLogIn">
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
