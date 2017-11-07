import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './SignUp.css';

class SignUp extends Component {
  render() {
    return (
      <div id="signup">
        <form id="formSignUp" action="">
          <input type="text" id="userNameInput" placeholder="Username..."/>
          <br/>
          <input type="text" id="nameInput" placeholder="Full Name..."/>
          <br/>
          <input type="text" id="emailInput" placeholder="E-mail..."/>
          <br/>
          <input type="password" id="passwordInput" placeholder="Password..."/>
          <br/>
          <input type="password" id="passwordConfirmInput" placeholder="Confirm Password..."/>
          <br/>
          <input type="submit" id="loginButton" value="Register"/>
        </form>
      </div>
    );
  }
}

export default SignUp;