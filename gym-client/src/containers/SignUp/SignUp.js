import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import './SignUp.css';
import 'whatwg-fetch';

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
          <input type="submit" id="signUpButton" value="Register"/>
        </form>
      </div>
    );
  }

  

  signUp() {
    let username = document.getElementById('userNameInput').value;
    let name = document.getElementById('nameInput').value;
    let email = document.getElementById('emailInput').value;
    fetch('http://localhost:63288/api/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: document.getElementById('passwordInput').value,
        role: '2',
      })
    })
  }



componentDidMount() {
  document.getElementById("signUpButton").addEventListener("click", this.signUp); 
}

}

export default SignUp;

