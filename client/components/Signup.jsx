import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Signup = (props) => {
  // console.log("props in Login are", props);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameOnChange = (e) => {
    // console.log("e.target of username", e.target.value);
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
          // console.log(data.message);
          alert(data.message);
          // props.history.push("/");
        } else {
          // const user = data; //  // const {user, leaderBoard} = data
          console.log('data from sign up', data);
          props.signUpUser(data);
          alert('Signup successful');
          props.history.push('/game');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const message = data.message ? data.message : "";

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
        {/* check if {data.message is truthy} */}
        {/* <p>{message}</p> */}
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
