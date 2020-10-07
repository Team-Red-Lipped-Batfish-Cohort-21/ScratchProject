import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Signup = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const signup = () => {
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-type': 'Application/json',
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.message) {
          console.log('message from data response /signup', data.message);
        } else {
          props.signUpUser(data);
          // alert('Signup successful');
          props.history.push('/game');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="signLogIn">
      <h2>Create User</h2>
      <form>
        <label>Username: </label>
        <input type="text" value={username} onChange={usernameOnChange} />
        <label>Password: </label>
        <input type="password" value={password} onChange={passwordOnChange} />
      </form>
      <div className="buttons">
        <button onClick={signup}>Sign Up</button>
        <Link to={`/`}>
          <button type="button" className="buttons">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Signup);
