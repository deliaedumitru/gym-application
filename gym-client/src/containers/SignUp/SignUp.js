import React, {Component} from 'react';
import 'whatwg-fetch';
import {SERVER, SIGNUP} from "../../api/gym";
import './SignUp.css';

class SignUp extends Component {
    render() {
        return (
            <div className= "signup" id="signup">
                <form className="form" id="formSignUp" action="">
                    <span className="spanSignUp">SIGN UP</span>
                    <br/>
                    <div className = "wrapInput">
                        <span className = "label-input100" >Username</span>
                        <input className="input100" type="text" id="userNameInput" />

                    </div>

                    <div className ="wrapInput">
                        <span className = "label-input100" >Full Name</span>
                        <input  className="input100" type="text" id="nameInput" />

                    </div>

                    <div className ="wrapInput">
                        <span className = "label-input100" >E-mail</span>
                        <input  className="input100" type="text" id="emailInput" />

                    </div>

                    <div className ="wrapInput">
                        <span className = "label-input100" >Password</span>
                        <input  className="input100" type="password" id="passwordInput" />

                    </div>

                    <div className ="wrapInput">
                        <span className = "label-input100" >Confirm Password</span>
                        <input  className="input100" type="password" id="passwordConfirmInput" />

                    </div>

                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button id="signUpButton" className="login100-form-btn">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


    signUp() {
        let username = document.getElementById('userNameInput').value;
        let name = document.getElementById('nameInput').value;
        let email = document.getElementById('emailInput').value;
        fetch(`${SERVER}${SIGNUP}`, {
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
                role: '2'
            })
        })
    }


    componentDidMount() {
        document.getElementById("signUpButton").addEventListener("click", this.signUp);
    }

}

export default SignUp;

