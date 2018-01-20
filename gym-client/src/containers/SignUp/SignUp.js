import React, {Component} from 'react';
import './SignUp.css';
import 'whatwg-fetch';
import {login, signUp} from "../../api/gym";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {error: false};
    }


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
                    <p> {this.state.error ? "INVALID DATA" : ""} </p>
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


    handleSignUp = () => {
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
        window.scrollTo(0, 0);
        document.getElementById("signUpButton").addEventListener("click", this.handleSignUp);
    }

}

export default SignUp;

