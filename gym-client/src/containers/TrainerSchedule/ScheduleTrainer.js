/**
 * Created by IT on 29/12/2017.
 */
import React, {Component} from 'react';
import moment from 'moment';
import 'whatwg-fetch';

import {SCHEDULE_TRAINERS, SERVER} from "../../api/gym";
import TrainerScheduleTable from "../../components/TrainerTable/TrainerScheduleTable";

import './style.css'
import {getMonday, getSunday} from "../DateUtils/index";

export default class ScheduleTrainer extends Component {
    constructor(props) {
        super(props);
        this.loadNextWeek = this.loadNextWeek.bind(this);
        this.loadPrevWeek = this.loadPrevWeek.bind(this);

        this.state = {
            classes: [],
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
    }

    loadSchedule(monday, sunday) {
        let trainerUrl = SERVER + SCHEDULE_TRAINERS + '/' + this.userId + '/details';
        fetch(trainerUrl, {
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
        )
    }
}
