import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import ReactTable from 'react-table'
import ClassSchedule from './ClassSchedule.js'
import 'whatwg-fetch';

class Schedule extends Component {

  constructor(props) {
    super(props);
    this.getMonday = this.getMonday.bind(this);
    this.getSunday = this.getSunday.bind(this);
    this.enrollToClassSchedule = this.enrollToClassSchedule.bind(this);
    this.unenrollToClassSchedule = this.unenrollToClassSchedule.bind(this);
    this.state = {
        classes: [],
        loggedUserEnrolled: []
    }
  }

  render() {
    console.log(this.state.loggedUserEnrolled);
    let button = null;
    // if(classSchedule.Id === 2) {
    //     button = <button id={classSchedule.Id} type="button" className="btn" onClick={this.enrollToClassSchedule}>Enroll</button>
    // } else {
    //     button = <button id={classSchedule.Id} type="button" className="btn" onClick={this.unenrollToClassSchedule}>Unenroll</button>
    // }

    return (
      <div className="schedule">
         <ul>
            {this.state.classes.map(classSchedule =>
            <li key={classSchedule.Id}>
                <h3>{classSchedule.ClassName}</h3>
                <p>{classSchedule.Date}</p>
                <p>Room {classSchedule.Room} <br/>
                {classSchedule.Capacity} places left</p>
                <button id={classSchedule.Id} type="button" className="btn" onClick={this.enrollToClassSchedule}>Sign up</button>
            </li>
                 )}
        </ul>
      </div>
    );
  }


    enrollToClassSchedule(e) {
        var scheduleId = e.target.id;
        //TODO: CHANGE WITH USER ID FROM LOCALSTORAGE!
        var userId = 5;

        let classSchedulesUrl = 'http://localhost:63288/api/ClassSchedules/' + scheduleId + '/participants/' + userId;

         fetch(classSchedulesUrl, { 
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
            }).then().then()
            .catch((error) => {
                console.error(error); 
            });
  }

    unenrollToClassSchedule(e) {
            console.log("unenroll");
    }

  componentDidMount() {
      let classSchedulesUrl = 'http://localhost:63288/api/classSchedules/details';
      let userEnrolledUrl = 'http://localhost:63288/api/users/' + 5 + '/enrolledClasses';

      let monday = this.getMonday(new Date());
      let sunday = this.getSunday(monday);
      
      console.log(monday);
      console.log(sunday);

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
        return new Date(d.setDate(diff));
    }

    getSunday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + 7; // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
  
}

export default Schedule;