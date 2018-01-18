import React, {Component} from 'react';
import 'whatwg-fetch';
import {login} from "../../api/gym";

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
        const username = document.getElementById('userNameInput').value;
        const password = document.getElementById('passwordInput').value;
        login(username, password);
    }

    componentDidMount() {
        document.getElementById("logInButton").addEventListener("click", this.logIn);
    }

}

export default LogIn;
