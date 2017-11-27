import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import App from "./App";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Schedule from "./Schedule/Schedule";
import ClassSchedule from "./AddClassShedule/index";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container">
          <div className="navbar">
            <ul className="logoul"><li>Gym App</li></ul>
            <ul className="header">
              <li className="home"><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/Schedule/Schedule">Schedule</NavLink></li> 
              <li><NavLink to="/AddClassShedule/">Class Schedule</NavLink></li>  
              <li><NavLink to="/LogIn">Log In</NavLink></li>
              <li><NavLink to="/SignUp">Sign Up</NavLink></li>
            </ul>
          </div>
          <div className="content">
            <Route exact path="/" component={App}/>
            <Route path="/LogIn" component={LogIn}/>
            <Route path="/SignUp" component={SignUp}/>
            <Route path="/Schedule/Schedule" component={Schedule}/>
            <Route path="/AddClassShedule/" component={ClassSchedule}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
