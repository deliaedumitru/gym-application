import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import ClassScheduleItem from './ClassScheduleItem';
import moment from 'moment';

import 'whatwg-fetch';
import './Schedule.css'

class Schedule extends Component {
	
    constructor(props) {
        super(props);
        this.getMonday = this.getMonday.bind(this);
        this.getSunday = this.getSunday.bind(this);
        this.enrollToClassSchedule = this.enrollToClassSchedule.bind(this);
        this.unenrollToClassSchedule = this.unenrollToClassSchedule.bind(this);
        this.containsElement = this.containsElement.bind(this);
        this.loadCurrentWeek = this.loadCurrentWeek.bind(this);
        this.loadNextWeek = this.loadNextWeek.bind(this);

        this.state = {
            classes: [],
            loggedUserEnrolled: null
        }
        if(JSON.parse(localStorage.getItem("user"))) {
            this.userId = JSON.parse(localStorage.getItem("user")).id;
        } else {
            this.userId = null;
        }
    }

    render() {
        let mondayClasses = [];
        let tuesdayClasses = [];
        let wednesdayClasses = [];
        let thursdayClasses = [];    
        let fridayClasses = [];
        let saturdayClasses = [];   

        for(var i = 0; i < this.state.classes.length; i++) {
            let classSchedule = this.state.classes[i];
            let element = null;
            
            if(this.containsElement(classSchedule.Id) === false) {
                element = (
                    <div className="classItem"  key={classSchedule.Id}>
                        <ClassScheduleItem scheduleId={classSchedule.Id} name={classSchedule.ClassName} room={classSchedule.Room} 
                        capacity={classSchedule.AvailableCapacity} date={classSchedule.Date}/>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.enrollToClassSchedule}>Enroll</button>
                    </div>
                );
            } else {
                 element = (
                    <div className="classItem" key={classSchedule.Id}>
                        <ClassScheduleItem scheduleId={classSchedule.Id} name={classSchedule.ClassName} room={classSchedule.Room} 
                        capacity={classSchedule.AvailableCapacity} date={classSchedule.Date}/>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.unenrollToClassSchedule}>Unenroll</button>
                    </div>
                );
            }

            if(classSchedule.DayOfWeek === 'Monday') {
                mondayClasses.push(element);
            } else if (classSchedule.DayOfWeek === 'Tuesday') {
                tuesdayClasses.push(element);
            } else if (classSchedule.DayOfWeek === 'Wednesday') {
                wednesdayClasses.push(element);
            } else if (classSchedule.DayOfWeek === 'Thursday') {
                thursdayClasses.push(element);
            } else if (classSchedule.DayOfWeek === 'Friday') {
                fridayClasses.push(element);
            } else if (classSchedule.DayOfWeek === 'Saturday') {
                saturdayClasses.push(element);
            }
        } 

        if(mondayClasses.length === 0) mondayClasses = <p>No classes this day!</p>
        if(tuesdayClasses.length === 0) tuesdayClasses = <p>No classes this day!</p>
        if(wednesdayClasses.length === 0) wednesdayClasses = <p>No classes this day!</p>
        if(thursdayClasses.length === 0) thursdayClasses = <p>No classes this day!</p>
        if(fridayClasses.length === 0) fridayClasses = <p>No classes this day!</p>
        if(saturdayClasses.length === 0) saturdayClasses = <p>No classes this day!</p>

        if(this.state && this.state.classes) {
            return (
                <div className="schedule">
                    <p className="center"><button onClick={this.loadCurrentWeek}>Current week</button>  |  <button onClick={this.loadNextWeek}>Next week</button></p>
                    <table className="center">
                        <thead>
                            <tr>
                                <th>Monday</th>
                                <th>Tuesday</th> 
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="listOfClassItems">
                                        {mondayClasses}
                                    </div>
                                </td>
                                <td>
                                    <div className="listOfClassItems">
                                        {tuesdayClasses}
                                    </div>
                                </td>
                                <td>
                                    <div className="listOfClassItems">
                                        {wednesdayClasses}
                                    </div>
                                </td>
                                <td>
                                    <div className="listOfClassItems">
                                        {thursdayClasses}
                                    </div>
                                </td>
                                <td>
                                    <div className="listOfClassItems">
                                        {fridayClasses}
                                    </div>
                                </td>
                                <td>
                                    <div className="listOfClassItems">
                                        {saturdayClasses}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else
        //fa fa-spinner fa-spin needs bootstrap
         return (
            <div className="loading">
                <i className="fa fa-spinner fa-spin"></i> 
                <span>Loading...</span>
            </div>)
    }


    enrollToClassSchedule(e) {
        if(this.userId) {
            var scheduleId = e.target.id;

            let enrollUserUrl = 'http://localhost:63288/api/ClassSchedules/' + scheduleId + '/participants/' + this.userId;

            fetch(enrollUserUrl, { 
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then()
            .then(responseData => {
                for(var i = 0; i < this.state.classes.length; i++) {
                    if(this.state.classes[i].Id == scheduleId) {
                        this.state.classes[i].AvailableCapacity = this.state.classes[i].AvailableCapacity - 1;
                    }
                }
                this.forceUpdate();
                this.loadEnrolledClasses();
            })
            .catch((error) => {
                console.error(error); 
            });
        } //SHOW ERROR MESSAGE: NOT LOGGED IN!
    }

    unenrollToClassSchedule(e) {
        if(this.userId) {
            var scheduleId = e.target.id;

            let unenrollUserUrl = 'http://localhost:63288/api/ClassSchedules/' + scheduleId + '/participants/' + this.userId;
            fetch(unenrollUserUrl, { 
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then()
            .then(responseData => {
                for(var i = 0; i < this.state.classes.length; i++) {
                    if(this.state.classes[i].Id == scheduleId) {
                        this.state.classes[i].AvailableCapacity = this.state.classes[i].AvailableCapacity + 1;
                    }
                }
                this.forceUpdate();
                this.loadEnrolledClasses();
            })
            .catch((error) => {
                console.error(error); 
            });
        }
    }
  
    loadEnrolledClasses() {
        if(this.userId) {
            let userEnrolledUrl = 'http://localhost:63288/api/users/' + this.userId + '/enrolledClasses';

            fetch(userEnrolledUrl, { 
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
                }) 
            .then(response => response.json())
            .then(responseData => {
                this.setState({ loggedUserEnrolled: responseData });
            })
            .catch((error) => {
                console.error(error); 
            });
        }
    }

    loadSchedule(monday, sunday) {
        let classSchedulesUrl = 'http://localhost:63288/api/classSchedules/details';

        fetch(classSchedulesUrl, { 
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                startDate: monday,
                endDate: sunday,
            })})
        .then(response => response.json())
        .then(responseData => {
            this.setState({ classes: responseData });
        })
        .catch((error) => {
            console.error(error); 
        });
    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? - 6:1); // adjust when day is sunday
        d.setDate(diff)
        var m = moment(d);
        m.set('hour', 0);
        m.set('minute', 0);
        m.set('second', 0);
        m.set('millisecond', 0);
        return m;
    }

    getSunday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + 7; // adjust when day is sunday
        d.setDate(diff)
        var m = moment(d);
        m.set('hour', 23);
        m.set('minute', 59);
        m.set('second', 59);
        m.set('millisecond', 0);
        return m;
    }

    containsElement(e) {
        if(!this.state.loggedUserEnrolled) return false;
        var found = false;
        for(var i = 0; i < this.state.loggedUserEnrolled.length; i++) {
            if (this.state.loggedUserEnrolled[i] === e) {
                found = true;
                break;
            }
        }
        return found;
    }

    loadCurrentWeek() {
        let monday = this.getMonday(new Date());
        let sunday = this.getSunday(monday);
        this.loadSchedule(monday, sunday);
        this.loadEnrolledClasses();
    }

    loadNextWeek() {
        let monday = this.getMonday(new Date()).add(7, "day");
        let sunday = this.getSunday(monday).add(7, "day");
        this.loadSchedule(monday, sunday);
        this.loadEnrolledClasses();
    }


    componentDidMount() {
        let monday = this.getMonday(new Date());
        let sunday = this.getSunday(monday);
        this.loadSchedule(monday, sunday);
        this.loadEnrolledClasses();
    }
  
}

export default Schedule;