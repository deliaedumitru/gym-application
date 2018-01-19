import React, {Component} from 'react';
import moment from 'moment';
import 'whatwg-fetch';

import ErrorModal from "../../components/ErrorModal/index";
import {SCHEDULE_PERSONALS, SERVER} from "../../api/gym";
import PersonalScheduleTable from "../../components/PersonalScheduleTable/index";

import './style.css'
import {getMonday, getSunday} from "../DateUtils/index";

export default class SchedulePersonal extends Component {
    constructor(props) {
        super(props);
        this.loadNextWeek = this.loadNextWeek.bind(this);
        this.loadPrevWeek = this.loadPrevWeek.bind(this);

        this.state = {
            classes: [],

            isOpen: true,
            errorMsg: null,
            errorStack: null,
            showClose: true
        };

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
    }

    toggleModal = () => {
        this.setState({
            errorMsg: null,
            errorStack: null,
            showClose: true,
            isOpen: !this.state.isOpen
        });
    };

    shouldComponentUpdate() {
        console.log("should component update");
        return true;
    }

    componentDidMount() {
        console.log("component did mount");
        let monday = getMonday(new Date());
        let sunday = getSunday(monday);
        this.loadSchedule(monday, sunday);
    }

    loadSchedule(monday, sunday) {
        let personalUrl = SERVER + SCHEDULE_PERSONALS + '/' + this.userId + '/details';
        fetch(personalUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id : this.userId,
                startDate: monday,
                endDate: sunday,
            })
        }).then(response =>{ 
            if(!response.ok) {
                throw Error("error");
            } else return         response.json()
        }).then(responseData => {
            if(responseData!=null) this.setState({classes: responseData, monday, sunday});
        }).catch((error) => {
            console.log("intra in error");
            this.setState({errorMsg:  `Error loading the schedule! Please try again!`});
            this.setState({errorStack:  JSON.stringify(error, Object.getOwnPropertyNames(error))});
            this.setState({isOpen: true});
            this.setState({showClose: true});
        });
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
                        <PersonalScheduleTable
                            classes={classes}
                        />
                    </div>
                    : <div className="loading">
                        <i className="fa fa-spinner fa-spin"/>
                        <span>Loading...</span>
                    </div>
                }
                {this.state.errorMsg ?
                    <ErrorModal show={this.state.isOpen}
                        onClose={this.toggleModal}
                        errorMessage={this.state.errorMsg}
                        errorStack={this.state.errorStack}
                        showClose={this.state.showClose}
                    ></ErrorModal>
                    : null
                }
            </div>
        )
    }
}
