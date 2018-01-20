import React, {Component} from "react";
import App from "../App";
import LogIn from "../LogIn/LogIn";
import Schedule from "../ScheduleUser";
import SignUp from "../SignUp/SignUp";
import ScheduleTrainer from "../TrainerSchedule/ScheduleTrainer";
import TrainerProfile from "../TrainerProfile";
import Trainers from "../Trainers";
import SubscriptionUser from "../SubscriptionUser";
import SubscriptionAdmin from "../SubscriptionAdmin";
import ClassSchedule from "../ScheduleAdmin/index.js";
import {getUserRole} from "../../utils/UserUtils";
import {Navigation} from "../../components/Navigation";
import Class from "../Class";
import {LogoutComponent} from "../LogIn/Logout";
import SchedulePersonal from "../PersonalSchedule";
import {HomeRedirector} from "../HomeRedirector";

//                         <Route path="/SchedulePersonal" component={SchedulePersonal}/>


// all the navigation elements
// will be used for creating the navigation
// notice trainer profile lacks title, that means it will be added to navigation
// but not to the navbar
const NAVIGATION_ITEMS = {
    'home': {path: "/", component: App, title: 'HOME'},
    'login': {path: "/LogIn", component: LogIn, title: 'LOGIN'},
    'signup': {path: "/SignUp", component: SignUp, title: 'SIGNUP'},
    'logout': {path: "/Logout", component: LogoutComponent, title: 'LOGOUT'},
    'logout_redirect': {path: "/Logout", component: HomeRedirector},  // helper ones to redirect if  the user hits them
    'login_redirect': {path: "/LogIn", component: HomeRedirector},
    'schedule': {path: "/Schedule", component: Schedule, title: 'SCHEDULE'},
    'add_schedule': {path: "/AddSchedule", component: ClassSchedule, title: 'MANAGE SCHEDULE'},
    'class': {path: "/Class", component: Class, title: 'CLASS'},
    'schedule_trainer': {path: "/ScheduleTrainer", component: ScheduleTrainer, title: 'SCHEDULE TRAINER'},
    'schedule_personal': {path: "/SchedulePersonal", component: SchedulePersonal, title: 'SCHEDULE PERSONAL'},
    'trainer_profile': {path: "/Trainer/:id", component: TrainerProfile},
    'trainers': {path: "/Trainers", component: Trainers, title: 'TRAINERS'},
    'subscription_user': {path: "/SubscriptionUser", component: SubscriptionUser, title: 'SUBSCRIPTION'},
    'subscription_admin': {path: "/SubscriptionAdmin", component: SubscriptionAdmin, title: 'MANAGE SUBSCRIPTIONS'},
};

// the available components, based on role(can contain content which does not have 'title'
// and is therefore not on the navbar
const DEFAULT_NAVBARS = {
    'ANON': ['home', 'login', 'signup', 'trainers', 'schedule', 'trainer_profile', 'logout_redirect'],
    'USER': ['home', 'schedule', 'schedule_personal', 'trainers', 'subscription_user', 'trainer_profile', 'logout', 'login_redirect'],
    'TRAINER': ['home', 'schedule', 'schedule_trainer', 'trainers', 'trainer_profile', 'logout', 'login_redirect'],
    'ADMIN': ['home',  'add_schedule', 'class', 'trainers', 'trainer_profile', 'subscription_admin', 'logout', 'login_redirect'],

};

// get the navigation item for that particular role
const getNavigationItems = (role) =>
    DEFAULT_NAVBARS[role].map((item_name) => NAVIGATION_ITEMS[item_name]);


export default class NavigationContainer extends Component {
    render = () => {
        const nav_items = getNavigationItems(getUserRole());
        return <Navigation items={nav_items}/>
    };
};