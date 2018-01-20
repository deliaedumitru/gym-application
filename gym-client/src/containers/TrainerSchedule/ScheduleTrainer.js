/**
 * Created by IT on 29/12/2017.
 */
import React, {Component} from 'react';
import moment from 'moment';
import 'whatwg-fetch';

import {getPersonalTrainerSchedule, getUsers,postPersonalUserSchedule} from "../../api/gym";
import TrainerScheduleTable from "../../components/TrainerTable/TrainerScheduleTable";

import PersonalScheduleForm from "../../components/PersonalScheduleForm/index";

import './style.css'
import {getMonday, getSunday} from "../DateUtils/index";

export default class ScheduleTrainer extends Component {
    constructor(props) {
        super(props);
        this.loadNextWeek = this.loadNextWeek.bind(this);
        this.loadPrevWeek = this.loadPrevWeek.bind(this);
        this.loadUsers = this.loadUsers.bind(this);
        this.addPersonalSchedule = this.addPersonalSchedule.bind(this);

        this.state = {
            classes: [],
            monday: getMonday(new Date()),
            sunday: getSunday(getMonday(new Date())),
            
            users: null,
            isTrainer: null
        };

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
        this.userRole = user ? user.role : null
    }

    shouldComponentUpdate() {
        console.log("should component update");
        return true;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        console.log("component did mount");
        let monday = getMonday(new Date());
        let sunday = getSunday(monday);
        this.loadSchedule(monday, sunday);

        if(this.userRole && this.userRole == 1) {
            this.setState({isTrainer: true});
            this.loadUsers();
        }
    }

    loadUsers() {
        const onSucces = (responseJson) => {
            const trainers = responseJson.map((elem) =>
                ({value: elem.Id, label: elem.Name})
            );
            this.setState({users: trainers});
            console.log(responseJson);
        };

        // get the trainers and persist them to state
        getUsers(onSucces);
    }

    addPersonalSchedule(event, selectedUser, room, startDate) {
        event.preventDefault();
        
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user ? user.id : null;

        console.log(selectedUser.value + " " + room + " " + startDate);
        const onSuccess = (responseData) => {
            this.setState((prevState)=>(
                prevState.classes.push(responseData)
            ));
        };
        postPersonalUserSchedule(selectedUser.value, userId, startDate, room, onSuccess);
        
    }

    loadSchedule(monday, sunday) {
        const startDate = monday;
        const endDate = sunday;
        const onSuccess = (responseData) => {
            this.setState({classes: responseData, monday, sunday});
        };

        getPersonalTrainerSchedule(startDate, endDate, this.userId, onSuccess);
    }

    loadNextWeek() {
        console.log("load next week");
        const {monday, sunday} = this.state;
        this.loadSchedule(monday.add(7, "day"), sunday.add(7, "day"));
    }

    loadPrevWeek() {
        console.log("load prev week");
        const {monday, sunday} = this.state;
        this.loadSchedule(monday.subtract(7, "day"), sunday.subtract(7, "day"));
    }


    render() {
        const {classes, monday, sunday} = this.state;
        const start = moment(monday).tz("Europe/Bucharest").format("DD.MMM.YYYY");
        const end = moment(sunday).tz("Europe/Bucharest").format("DD.MMM.YYYY");

        //fa fa-spinner fa-spin needs bootstrap
        return (
            <div>
                <br/>
                <p className="center">
                    <br/>
                    <button className="button" onClick={this.loadPrevWeek}>Prev</button>
                    <span style={{padding: 20,fontSize:20}}>
                        GYM SCHEDULE {start} - {end}
                    </span>
                    <button className="button" onClick={this.loadNextWeek}>Next</button>

                </p>
                <br/><div style={{display: 'inline-flex', width: '100%'}}>
                        <PersonalScheduleForm
                            users={this.state.users}
                            handleSubmit={this.addPersonalSchedule}
                        />

                        {classes ?
                            <div className="schedule">
                                <TrainerScheduleTable
                                    classes={classes}
                                />
                            </div>
                            : <div className="loading">
                                <i className="fa fa-spinner fa-spin"/>
                                <span>Loading...</span>
                            </div>
                        }
                    </div> 
                
            </div>
        )
    }
}
