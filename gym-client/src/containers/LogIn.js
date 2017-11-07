import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './LogIn.css';

class LogIn extends Component {
  render() {
    return (
      <div className="login">
        <form id="formLogIn" action="">
          <input type="text" className="userNameInput" placeholder="Username..."/>
          <br/>
          <input type="password" className="passwordInput" placeholder="Password..."/>
          <br/>
          <input type="submit" className="loginButton" value="Log In"/>
        </form>
      </div>
    );
  }
}

export default LogIn;