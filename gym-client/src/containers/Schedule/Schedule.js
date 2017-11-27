import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import 'whatwg-fetch';

class Schedule extends Component {
	
    constructor(props) {
        super(props);
        this.getMonday = this.getMonday.bind(this);
        this.getSunday = this.getSunday.bind(this);
        this.enrollToClassSchedule = this.enrollToClassSchedule.bind(this);
        this.unenrollToClassSchedule = this.unenrollToClassSchedule.bind(this);
        this.containsElement = this.containsElement.bind(this);

        this.state = {
            mondayClasses: [],
            tuesdayClasses: [],
            wednesdayClasses: [],
            thursdayClasses: [],
            fridayClasses: [],
            saturdayClasses: [],

            loggedUserEnrolled: []
        }

        this.userId = 5;

        this.loadSchedule();
        this.loadEnrolledClasses();
    }

    render() {
        console.log(this.state.loggedUserEnrolled);
        // let button = null;
        // if(classSchedule.Id === 2) {
        //     button = <button id={classSchedule.Id} type="button" className="btn" onClick={this.enrollToClassSchedule}>Enroll</button>
        // } else {
        //     button = <button id={classSchedule.Id} type="button" className="btn" onClick={this.unenrollToClassSchedule}>Unenroll</button>
        // }
        // const listItems = this.state.classes.Monday.map(classesPerDay =>
        //     <p></p>
        //     // console.log(classesPerDay)
        // );

        const mondayClasses = (
            this.state.mondayClasses.map((classSchedule) => {
                return this.containsElement(classSchedule.Id) === true ?
                    <div className="classScheduleItem" key={classSchedule.Id}>
                        <p>{classSchedule.Id}</p>
                        <p>{classSchedule.ClassName}</p>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.unenrollToClassSchedule}>Unenroll</button>
                    </div>
                : <div className="classScheduleItem" key={classSchedule.Id}>
                        <p>{classSchedule.Id}</p>
                        <p>{classSchedule.ClassName}</p>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.enrollToClassSchedule}>Enroll</button>
                    </div>
            })
        );

        const tuesdayClasses = (
            this.state.tuesdayClasses.map((classSchedule) =>{
                 return this.containsElement(classSchedule.Id) === true 
                    ?
                    <div className="classScheduleItem" key={classSchedule.Id}>
                        <p>{classSchedule.Id}</p>
                        <p>{classSchedule.ClassName}</p>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.unenrollToClassSchedule}>Unenroll</button>
                    </div>
                    : 
                    <div className="classScheduleItem" key={classSchedule.Id}>
                        <p>{classSchedule.Id}</p>
                        <p>{classSchedule.ClassName}</p>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.enrollToClassSchedule}>Enroll</button>
                    </div>
            })
        );

        const wednesdayClasses = (
            this.state.wednesdayClasses.map((classSchedule) => {
                 return this.containsElement(classSchedule.Id) === true 
                    ?
                    <div className="classScheduleItem" key={classSchedule.Id}>
                        <p>{classSchedule.Id}</p>
                        <p>{classSchedule.ClassName}</p>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.unenrollToClassSchedule}>Unenroll</button>
                    </div>
                    : 
                    <div className="classScheduleItem" key={classSchedule.Id}>
                        <p>{classSchedule.Id}</p>
                        <p>{classSchedule.ClassName}</p>
                        <button id={classSchedule.Id} type="button" className="btn" onClick={this.enrollToClassSchedule}>Enroll</button>
                    </div>
            })
        );


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
                            <td id="monday">
                                <div className="scheduleDayList">
                                    {mondayClasses}
                                </div>
                            </td>
                            <td id="tuesday">
                                <div className="scheduleDayList">
                                    {tuesdayClasses}
                                </div>
                            </td>
                            <td id="wednesday">
                                <div className="scheduleDayList">
                                    {wednesdayClasses}
                                </div>
                            </td>
                            <td id="thursday">Jill</td>
                            <td id="friday">Jill</td>
                            <td id="saturday">Jill</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }


    enrollToClassSchedule(e) {
        var scheduleId = e.target.id;
        //TODO: CHANGE WITH USER ID FROM LOCALSTORAGE!
        
        let classSchedulesUrl = 'http://localhost:63288/api/ClassSchedules/' + scheduleId + '/participants/' + this.userId;

        fetch(classSchedulesUrl, { 
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
            })
        .then()
        .then()
        .catch((error) => {
            console.error(error); 
        });
    }

    unenrollToClassSchedule(e) {
            console.log("unenroll");
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
            this.setState({ mondayClasses: responseData.Monday });
            this.setState({ tuesdayClasses: responseData.Tuesday });
            this.setState({ wednesdayClasses: responseData.Wednesday });
            this.setState({ thursdayClasses: responseData.Thursday });
            this.setState({ fridayClasses: responseData.Friday });
            this.setState({ saturdayClasses: responseData.Saturday });
        })
        .catch((error) => {
            console.error(error); 
        });
    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? - 6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    getSunday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + 7; // adjust when day is sunday
        return new Date(d.setDate(diff));
    }

    containsElement(id) {
        var found = false;
        for(var i = 0; i < this.state.loggedUserEnrolled.length; i++) {
            if (this.state.loggedUserEnrolled[i] == id) {
                found = true;
                break;
            }
        }
        return found;
    }

    componentDidMount() {
    }
  
}

export default Schedule;