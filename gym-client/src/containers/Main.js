import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import App from "./App";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Class from "./Class";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container">
        <div id="backimg"></div>
          <div className="navbar">
            <ul className="logoul"><li>Gym App</li></ul>
            <ul className="header">
              <li className="home"><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/LogIn">Log In</NavLink></li>
              <li><NavLink to="/SignUp">Sign Up</NavLink></li>
              <li><NavLink to="/Class">Class</NavLink></li>
            </ul>
          </div>
          <div className="content">
            <Route exact path="/" component={App}/>
            <Route path="/LogIn" component={LogIn}/>
            <Route path="/SignUp" component={SignUp}/>
            <Route path="/Class" component={Class}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
