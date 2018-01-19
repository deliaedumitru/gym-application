import React, {Component} from 'react';
import 'whatwg-fetch';
import {LOGIN, SERVER} from "../../api/gym";
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
                        <input className="input100" type = "text" id="userNameInput" placeholder="Username..."/>
                        <span className="focus-input100" data-symbol="&#xf206;"></span>
                    </div>

                    <div className ="wrapInput">
                        <span className = "label-input100" >Password</span>
                        <input  className="input100" type="password" id="passwordInput" placeholder="Password..."/>
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
        let username = document.getElementById('userNameInput').value;
        fetch(`${SERVER}${LOGIN}`, {
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
            let user = {id: responseJson.Id, username: username, name: responseJson.Name, role: responseJson.Role};
            localStorage.setItem('user', JSON.stringify(user));
            console.log(user);
            console.log(JSON.parse(localStorage.getItem('user')));
            //alternatively, a function can be called that does the local storage and redirect to some other layout
            //it can be accessed by 'localStorage.getItem('user');
            //it can be remover by localStorage.removeItem('user');
            //objects = JSON.parse(localStorage.getItem('user'));
        }).catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        document.getElementById("logInButton").addEventListener("click", this.logIn);
    }

}

export default LogIn;
