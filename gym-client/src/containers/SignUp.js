import React, {Component} from 'react';
import 'whatwg-fetch';
import {login, signUp} from "../api/gym";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {error: false};
    }

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
                    <p> {this.state.error ? "INVALID DATA" : ""} </p>
                    <br />
                    <input type="submit" id="signUpButton" value="Register"/>
                </form>
            </div>
        );
    }


    signUp = () => {
        let username = document.getElementById('userNameInput').value;
        let name = document.getElementById('nameInput').value;
        let email = document.getElementById('emailInput').value;
        let password = document.getElementById('passwordInput').value;
        signUp(username, name, email, password, () => {
            login(username, password, ()=> window.location.reload())
            },
            (err)=> {
                this.setState({error: true})
            });
    };


    componentDidMount() {
        document.getElementById("signUpButton").addEventListener("click", this.signUp);
    }
}

export default SignUp;

