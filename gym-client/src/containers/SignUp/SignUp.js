import React, {Component} from 'react';
import 'whatwg-fetch';
import {signUp} from "../../api/gym";

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
        const username = document.getElementById('userNameInput').value;
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        signUp(username, name, email, password);
    }


    componentDidMount() {
        document.getElementById("signUpButton").addEventListener("click", this.signUp);
    }

}

export default SignUp;

