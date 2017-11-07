import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import App from "./App";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Gym App</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/LogIn">Log In</NavLink></li>
            <li><NavLink to="/SignUp">Sign Up</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={App}/>
            <Route path="/LogIn" component={LogIn}/>
            <Route path="/SignUp" component={SignUp}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;