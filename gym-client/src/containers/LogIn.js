import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './LogIn.css';
import 'whatwg-fetch';

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {user: ""}
  }

  render() {
    return (
      <div className="login">
        <form id="formLogIn" action="">
          <input type="text" id="userNameInput" placeholder="Username..."/>
          <br/>
          <input type="password" id="passwordInput" placeholder="Password..."/>
          <br/>
          <input type="submit" id="logInButton" value="Log In"/>
        </form>
      </div>
    );
  }

  logIn() {
    let username = document.getElementById('userNameInput').value;
    fetch('http://localhost:63288/api/users/login/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: document.getElementById('passwordInput').value,
      })
    }).then((response) => response.json()).then((responseJson) => { 
      console.log(responseJson);
    }).catch((error) => { 
      console.error(error); 
    });
  }

  componentDidMount() {
		document.getElementById("logInButton").addEventListener("click", this.logIn); 
  }
  
}

export default LogIn;