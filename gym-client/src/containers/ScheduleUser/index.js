import React, {Component} from 'react';
import moment from 'moment';
import 'whatwg-fetch';

import {SCHEDULE_DETAILS, SERVER} from "../../api/gym";
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
            let enrollUserUrl = SERVER + 'ClassSchedules/' + scheduleId + '/participants/' + this.userId;

            //TODO handle error case
            fetch(enrollUserUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            }).then().then(responseData => {
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
            }).catch((error) => {
                console.error(error);
            });
        } else {
            //SHOW ERROR MESSAGE: NOT LOGGED IN!
            console.log("not logged in!!")
        }
    }

    unEnrollToClassSchedule(scheduleId) {
        if (this.userId) {
            let unEnrollUserUrl = SERVER + 'ClassSchedules/' + scheduleId + '/participants/' + this.userId;
            fetch(unEnrollUserUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }).then().then(responseData => {
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
            }).catch((error) => {
                console.error(error);
            });
        } else {
            //SHOW ERROR MESSAGE: NOT LOGGED IN!
            console.log("not logged in!!")
        }
    }

    loadEnrolledClasses() {
        if (this.userId) {
            let userEnrolledUrl = SERVER + 'users/' + this.userId + '/enrolledClasses';

            fetch(userEnrolledUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => response.json()).then(responseData => {
                this.setState({loggedUserEnrolled: responseData});
            }).catch((error) => {
                console.error(error);
            });
        } else {
            //SHOW ERROR MESSAGE: NOT LOGGED IN!
            console.log("not logged in!!")
        }
    }

    loadSchedule(monday, sunday) {
        fetch(`${SERVER}${SCHEDULE_DETAILS}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                startDate: monday,
                endDate: sunday,
            })
        }).then(response => response.json()).then(responseData => {
            this.setState({classes: responseData, monday, sunday});
        }).catch((error) => {
            console.error(error);
        });
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
                    <br/>
                    <button className="button" onClick={this.loadPrevWeek}>Prev</button>
                   <span style={{padding: 20,fontSize:20}}>
                        GYM SCHEDULE {start} - {end}
                    </span>
                    <button className="button" onClick={this.loadNextWeek}>Next</button>

                </p>
                <br/>
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
