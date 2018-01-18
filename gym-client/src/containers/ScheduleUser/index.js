import React, {Component} from 'react';
import moment from 'moment';
import 'whatwg-fetch';

import {enrollUser, getEnrollments, getSchedule, unenrollUser} from "../../api/gym";
import ScheduleTable from "../../components/ScheduleTable/index";

import './style.css'
import {getMonday, getSunday} from "../DateUtils/index";


export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.enrollToClassSchedule = this.enrollToClassSchedule.bind(this);
        this.unEnrollToClassSchedule = this.unEnrollToClassSchedule.bind(this);
        this.containsElement = this.containsElement.bind(this);
        this.loadNextWeek = this.loadNextWeek.bind(this);
        this.loadPrevWeek = this.loadPrevWeek.bind(this);

        this.state = {
            classes: [],
            loggedUserEnrolled: null,
        };

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
    }

    shouldComponentUpdate() {
        console.log("should component update");
        return true;
    }

    componentDidMount() {
        console.log("component did mount");
        let monday = getMonday(new Date());
        let sunday = getSunday(monday);
        this.loadSchedule(monday, sunday);
        this.loadEnrolledClasses();
    }

    enrollToClassSchedule(scheduleId) {
        if (this.userId) {
            const userId = this.userId;
            const onSuccess = (responseData) => {
                const {classes} = this.state;
                const updatedClasses = classes.map((it) => {
                    if (it.Id.toString() === scheduleId) {
                        return {
                            ...it,
                            AvailableCapacity: it.AvailableCapacity - 1,
                        }
                    }
                    return it;
                });

                this.loadEnrolledClasses();
                this.setState(() => ({classes: updatedClasses}));
            };

            enrollUser(userId, scheduleId, onSuccess);
        } else {
            //SHOW ERROR MESSAGE: NOT LOGGED IN!
            console.log("not logged in!!")
        }
    }

    unEnrollToClassSchedule(scheduleId) {
        if (this.userId) {
            const onSuccess = (responseData) => {
                const {classes} = this.state;
                const updatedClasses = classes.map((it) => {
                    if (it.Id.toString() === scheduleId) {
                        return {
                            ...it,
                            AvailableCapacity: it.AvailableCapacity + 1,
                        }
                    }
                    return it;
                });

                this.setState(() => ({classes: updatedClasses}));
                console.log("classes after", this.state.classes);
                this.loadEnrolledClasses();
            };

            const userId = this.userId;
            unenrollUser(userId, scheduleId, onSuccess);
        } else {
            //SHOW ERROR MESSAGE: NOT LOGGED IN!
            console.log("not logged in!!")
        }
    }

    loadEnrolledClasses() {
        if (this.userId) {
            const onSuccess = (responseData) => {
                this.setState({loggedUserEnrolled: responseData});
            };

            const userId = this.userId;
            getEnrollments(userId, onSuccess);
        } else {
            //SHOW ERROR MESSAGE: NOT LOGGED IN!
            console.log("not logged in!!")
        }
    }

    loadSchedule(monday, sunday) {
        const startDate = monday;
        const endDate = sunday;
        const onSuccess = (responseData) => {
            this.setState({classes: responseData, monday, sunday});
        };
        getSchedule(startDate, endDate, onSuccess);
    }

    containsElement(elem) {
        const {loggedUserEnrolled} = this.state;
        if (!loggedUserEnrolled) return false;
        return loggedUserEnrolled.includes(elem);
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
                <p className="center">
                   <span style={{padding: 20,fontSize:20}}>
                        Gym schedule {start} - {end}
                    </span>
                    <button onClick={this.loadPrevWeek}>‹</button>
                    <button onClick={this.loadNextWeek}>›</button>
                </p>
                {classes ?
                    <div className="schedule">
                        <ScheduleTable
                            classes={classes}
                            containsElement={this.containsElement}
                            enrollToClassSchedule={this.enrollToClassSchedule}
                            unEnrollToClassSchedule={this.unEnrollToClassSchedule}
                        />
                    </div>
                    : <div className="loading">
                        <i className="fa fa-spinner fa-spin"/>
                        <span>Loading...</span>
                    </div>
                }
            </div>
        )
    }
}
