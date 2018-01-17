import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import App from "./App";
import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import Schedule from "./ScheduleUser/index.js";
import ClassSchedule from "./ScheduleAdmin/index.js"
import Image from "react-bootstrap/es/Image";
import background from '../images/background.jpg';
import ScheduleTrainer from './TrainerSchedule/ScheduleTrainer';
import Class from "./Class/";
import UserDashboard from "./UserDashboard/UserDashboard";

export default class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div className="container">
                    <div className="navbar">
                        <ul className="logoul">
                            <li>Gym App</li>
                        </ul>
                        <ul className="header">
                            <li className="pages"><NavLink exact to="/">HOME</NavLink></li>
                            <li className="pages"><NavLink to="/Schedule">SCHEDULE</NavLink></li>
                            <li className="pages"><NavLink to="/AddSchedule">CRUD Schedule</NavLink></li>
							              <li className="pages"><NavLink to="/ScheduleTrainer">Schedule Trainer</NavLink></li>
                            <li className="pages"><NavLink to="/LogIn">LOG IN</NavLink></li>
                            <li className="pages"><NavLink to="/SignUp">SIGN UP</NavLink></li>
                            <li className="pages"><NavLink to="/Class">Class</NavLink></li>
                            <li className="pages"><NavLink to="/UserDashboard">UserDashboard</NavLink></li>
                        </ul>
                    </div>
                    <div className="content">
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <Route exact path="/" component={App}/>
                        <Route path="/LogIn" component={LogIn}/>
                        <Route path="/SignUp" component={SignUp}/>
                        <Route path="/Schedule" component={Schedule}/>
                        <Route path="/AddSchedule" component={ClassSchedule}/>
                        <Route path="/Class" component={Class}/>
                        <Route path="/ScheduleTrainer" component={ScheduleTrainer}/>
                        <Route path="/UserDashboard" component={UserDashboard}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

