import React, {Component} from "react";
import {HashRouter, NavLink, Route} from "react-router-dom";
import App from "./App";
import LogIn from "./LogIn/LogIn";
import SignUp from "./SignUp/SignUp";
import Schedule from "./ScheduleUser/index.js";
import ClassSchedule from "./ScheduleAdmin/index.js";
import SchedulePersonal from './PersonalSchedule/index'
import TrainerProfile from "./TrainerProfile/index.js";
import Trainers from "./Trainers/index.js";
import ScheduleTrainer from './TrainerSchedule/ScheduleTrainer';
import Class from "./Class/";
import SubscriptionUser from "./SubscriptionUser/index.js";
import SubscriptionAdmin from "./SubscriptionAdmin/index.js";

export default class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div className="gym-container">
                    <div style={{boxSizing: 'unset', fontSize: 15, color: 'black'}} className="gym-navbar">
                        <ul style={{
                            padding:0,
                            margin: 0,
                            width: '10%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }} className="logoul">
                            <li>Gym App</li>
                        </ul>
                        <ul style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            margin: 0,
                            boxSizing: 'unset',
                            fontSize: 15,
                            color: 'black',
                        }}
                            className="gym-header">
                            <li className="pages"><NavLink exact to="/">HOME</NavLink></li>
                            <li className="pages"><NavLink to="/Schedule">SCHEDULE</NavLink></li>
                            <li className="pages"><NavLink to="/AddSchedule">CRUD Schedule</NavLink></li>
                            <li className="pages"><NavLink to="/ScheduleTrainer">Schedule Trainer</NavLink></li>
                            <li className="pages"><NavLink to="/LogIn">LOG IN</NavLink></li>
                            <li className="pages"><NavLink to="/SignUp">SIGN UP</NavLink></li>
                            <li className="pages"><NavLink to="/Class">Class</NavLink></li>
                            <li className="pages"><NavLink to="/SchedulePersonal">Schedule Personal</NavLink></li>
                            <li className="pages"><NavLink to="/Trainers">Trainers</NavLink></li>
                            <li className="pages"><NavLink to="/SubscriptionUser">Subscription</NavLink></li>
                            <li className="pages"><NavLink to="/SubscriptionAdmin">Subscription admin</NavLink></li>
                        </ul>
                    </div>
                    <div className="content">
                        <Route exact path="/" component={App}/>
                        <Route path="/LogIn" component={LogIn}/>
                        <Route path="/SignUp" component={SignUp}/>
                        <Route path="/Schedule" component={Schedule}/>
                        <Route path="/AddSchedule" component={ClassSchedule}/>
                        <Route path="/Class" component={Class}/>
                        <Route path="/ScheduleTrainer" component={ScheduleTrainer}/>
                        <Route path="/SchedulePersonal" component={SchedulePersonal}/>
                        <Route path="/Trainer/:id" component={TrainerProfile}/>
                        <Route path="/Trainers" component={Trainers}/>
                        <Route path="/SubscriptionUser" component={SubscriptionUser}/>
                        <Route path="/SubscriptionAdmin" component={SubscriptionAdmin}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

