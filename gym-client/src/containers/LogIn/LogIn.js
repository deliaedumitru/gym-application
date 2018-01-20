import React, {Component} from 'react';
import 'whatwg-fetch';
import {login} from "../../api/gym";
import '../SignUp/SignUp.css';

class LogIn extends Component {

    constructor(props) {
        super(props);
        this.state = {user: ""}
    }

    render() {
        return (
            <div className="login">
                <form className="form" id="formLogIn" action="">
                    <span className="spanSignUp">LOGIN</span>

                    <br/>
                    <div className = "wrapInput">
                        <span className = "label-input100" >Username</span>
                        <input className="input100" type = "text" id="userNameInput" />
                        <span className="focus-input100" data-symbol="&#xf206;"></span>
                    </div>

                    <div className ="wrapInput">
                        <span className = "label-input100" >Password</span>
                        <input  className="input100" type="password" id="passwordInput" />
                        <span className="focus-input100" data-symbol="&#xf206;"></span>
                    </div>

                    <div className="container-login100-form-btn">
                        <div className="wrap-login100-form-btn">
                            <div className="login100-form-bgbtn"></div>
                            <button id="logInButton" className="login100-form-btn">
                                LOGIN
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    logIn() {
        const username = document.getElementById('userNameInput').value;
        const password = document.getElementById('passwordInput').value;
        login(username, password, () => window.location.reload());  // reload window on success
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.getElementById("logInButton").addEventListener("click", this.logIn);
    }

}

export default LogIn;
