import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div>
        This is Login
        <Link to={`/Signup`}>
          <button type='button' className='btnSecondary'>
            Sign Up
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
