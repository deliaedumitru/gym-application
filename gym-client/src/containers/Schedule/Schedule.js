import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import ClassSchedule from './ClassSchedule';
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

        this.state = {
            classes: [],
            loggedUserEnrolled: null
        }

        this.userId = 5;
    }

    render() {
        let mondayClasses = [];
        let tuesdayClasses = [];
        let wednesdayClasses = [];
        let thursdayClasses = [];    
        let fridayClasses = [];
        let saturdayClasses = [];   

        console.log(this.state.loggedUserEnrolled);

        for(var i = 0; i < this.state.classes.length; i++) {
            let classSchedule = this.state.classes[i];
            let element = null;
            if(this.containsElement(classSchedule.Id) === false) {
                element = (
                    <div className="classItem"  key={classSchedule.Id}>
                        <ClassSchedule scheduleId={classSchedule.Id} name={classSchedule.ClassName} room={classSchedule.Room} 
                        capacity={classSchedule.Capacity} date={classSchedule.Date}/>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.enrollToClassSchedule}>Enroll</button>
                    </div>
                );
            } else {
                 element = (
                    <div className="classItem" key={classSchedule.Id}>
                        <ClassSchedule scheduleId={classSchedule.Id} name={classSchedule.ClassName} room={classSchedule.Room} 
                        capacity={classSchedule.Capacity} date={classSchedule.Date}/>
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

        if(this.state && this.state.classes && this.state.loggedUserEnrolled) {
            return (
                <div className="schedule">
                    <table>
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
        } else return <p>Loading...</p>
    }


    enrollToClassSchedule(e) {
        var scheduleId = e.target.id;
        //TODO: CHANGE WITH USER ID FROM LOCALSTORAGE!
        
        let enrollUserUrl = 'http://localhost:63288/api/ClassSchedules/' + scheduleId + '/participants/' + this.userId;

        fetch(enrollUserUrl, { 
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then()
        .then(responseData => {
            let enrolledClasses = this.state.loggedUserEnrolled;
            enrolledClasses.push(scheduleId);
            this.setState({ loggedUserEnrolled: enrolledClasses });
        })
        .catch((error) => {
            console.error(error); 
        });
    }

    unenrollToClassSchedule(e) {
        var scheduleId = e.target.id;
        //TODO: CHANGE WITH USER ID FROM LOCALSTORAGE!

        let unenrollUserUrl = 'http://localhost:63288/api/ClassSchedules/' + scheduleId + '/participants/' + this.userId;
        fetch(unenrollUserUrl, { 
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then()
        .then(responseData => {
            let enrolledClasses = this.state.loggedUserEnrolled;
            enrolledClasses.pop(scheduleId);
            this.setState({ loggedUserEnrolled: enrolledClasses });
        })
        .catch((error) => {
            console.error(error); 
        });
    }
  
    loadEnrolledClasses() {
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

    loadSchedule() {
        let classSchedulesUrl = 'http://localhost:63288/api/classSchedules/details';
        let monday = this.getMonday(new Date());
        let sunday = this.getSunday(monday);

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
        var found = false;
        for(var i = 0; i < this.state.loggedUserEnrolled.length; i++) {
            if (this.state.loggedUserEnrolled[i] == e) {
                found = true;
                break;
            }
        }
        return found;
    }

    componentDidMount() {
        this.loadSchedule();
        this.loadEnrolledClasses();
    }
  
}

export default Schedule;