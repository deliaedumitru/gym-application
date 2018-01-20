/**
 * Created by IT on 29/12/2017.
 */
import React, {Component} from 'react';
import moment from 'moment';
import 'whatwg-fetch';

import {getPersonalTrainerSchedule} from "../../api/gym";
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
            monday: getMonday(new Date()),
            sunday: getSunday(getMonday(new Date()))
        };

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
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
                <br/>
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
