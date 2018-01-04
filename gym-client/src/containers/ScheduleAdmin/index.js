import React, {Component} from 'react';
import 'react-select/dist/react-select.css';

import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import {CLASSES, SCHEDULE, SCHEDULE_DETAILS, SERVER, TRAINERS} from "../../api/gym";
import ScheduleTable from "../../components/ScheduleTable/index";
import ClassScheduleForm from "../../components/ClassScheduleForm/index";
import {getMonday, getSunday} from "../DateUtils/index";

export default class ScheduleAdmin extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteClassSchedule = this.handleDeleteClassSchedule.bind(this);
        this.loadNextWeek = this.loadNextWeek.bind(this);
        this.loadPrevWeek = this.loadPrevWeek.bind(this);
        this.state = {
            trainers: null,
            classes: null,
            schedule: null,
        }
    }

    componentDidMount() {
        console.log("component did mount");
        const monday = getMonday(new Date());
        const sunday = getSunday(monday);
        this.loadSchedule(monday, sunday);
        this.loadClasses();
        this.loadTrainers();
    }

    loadSchedule(monday, sunday) {
        console.log("load schedule");
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
            this.setState({schedule: responseData, monday, sunday});
        }).catch((error) => {
            console.error(error);
        });
    }

    loadTrainers() {
        fetch(`${SERVER}${TRAINERS}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then((response) => response.json()).then((responseJson) => {
            const trainers = responseJson.map((elem) =>
                ({value: elem.Id, label: elem.Name})
            );
            this.setState(() => ({trainers}));
            console.log(responseJson);
        }).catch((error) => {
            console.error(error);
        });
    }

    loadClasses() {
        fetch(`${SERVER}${CLASSES}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        }).then((response) => response.json()).then((responseJson) => {
            const classes = responseJson.map((elem) =>
                ({value: elem.Id, label: elem.Name})
            );
            this.setState(() => ({classes}));
            console.log(responseJson);
        }).catch((error) => {
            console.error(error);
        });
    }


    handleSubmit(event, selectedTrainer, selectedClass, capacity, room, selectedDifficulty, startDate) {
        event.preventDefault();
        const {monday, sunday} = this.state;
        const date = startDate.format("YYYY-MM-DD HH:mm:ss");

        console.log("Submit");
        console.log("class = ", selectedClass);
        console.log("capacity = ", capacity);
        console.log("room = ", room);
        console.log("difficulty = ", selectedDifficulty);
        console.log("date = ", date);
        console.log("trainer = ", selectedTrainer);


        fetch(`${SERVER}${SCHEDULE}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: 1,
                ClassId: selectedClass.value,
                Date: date,
                Capacity: capacity,
                Room: room,
                Difficulty: selectedDifficulty - 1,
                TrainerId: selectedTrainer.value,
            })
        }).then((response) => response.json()).then((responseJson) => {
            console.log("Success:", responseJson);
            this.loadSchedule(monday, sunday);
            alert("Class added");
        }).catch((error) => {
            console.error(error);
        });
    }

    handleDeleteClassSchedule(id) {
        console.log("delete class");
        const {monday, sunday} = this.state;

        fetch(`${SERVER}ClassSchedules/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            },
        }).then(responseData => {
            console.log("success ", responseData);
            this.loadSchedule(monday, sunday);
            alert("class deleted");
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
        const {trainers, classes, schedule, monday, sunday} = this.state;
        console.log("schedule admin render");
        console.log("classes", classes);
        const start = moment(monday).tz("Europe/Bucharest").format("DD.MMM.YYYY");
        const end = moment(sunday).tz("Europe/Bucharest").format("DD.MMM.YYYY");

        return (
            <div>
                <p className="center">
                   <span style={{padding: 20, fontSize: 20}}>
                        Gym schedule {start} - {end}
                    </span>
                    <button onClick={this.loadPrevWeek}>‹</button>
                    <button onClick={this.loadNextWeek}>›</button>
                </p>
                <div style={{display: 'inline-flex', width: '100%'}}>
                    <ClassScheduleForm
                        trainers={trainers}
                        classes={classes}
                        handleSubmit={this.handleSubmit}
                    />

                    {schedule ?
                        <ScheduleTable
                            classes={schedule}
                            crud
                            handleDeleteClassSchedule={this.handleDeleteClassSchedule}
                        /> :
                        null
                    }
                </div>
            </div>
        );
    }
}
