import React, {Component} from 'react';
import 'react-select/dist/react-select.css';

import moment from 'moment';
import './style.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import {addClassSchedule, deleteClassSchedule, getClasses, getSchedule, getTrainers} from "../../api/gym";
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
        window.scrollTo(0, 0);
        console.log("component did mount");
        const monday = getMonday(new Date());
        const sunday = getSunday(monday);
        this.loadSchedule(monday, sunday);
        this.loadClasses();
        this.loadTrainers();
    }

    loadSchedule(monday, sunday) {
        console.log("load schedule");
        const onSuccess = (responseData) => this.setState({schedule: responseData, monday, sunday});


        getSchedule(monday, sunday, onSuccess);
    }

    loadTrainers() {
        const onSucces = (responseJson) => {
            const trainers = responseJson.map((elem) =>
                ({value: elem.Id, label: elem.Name})
            );
            this.setState(() => ({trainers}));
            console.log(responseJson);
        };

        // get the trainers and persist them to state
        getTrainers(onSucces);
    }

    loadClasses() {
        const onSuccess = (responseJson) => {
            const classes = responseJson.map((elem) =>
                ({value: elem.Id, label: elem.Name})
            );
            this.setState(() => ({classes}));
            console.log(responseJson);
        };

        // load the classes and persist them in the state
        getClasses(onSuccess);
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


        const id = 1;
        const classId = selectedClass.value;
        const trainerId = selectedTrainer.value;
        const difficulty = selectedDifficulty - 1;

        const onSuccess = (responseJson) => {
            this.loadSchedule(monday, sunday);
        };
        addClassSchedule(id, classId, date, capacity, room, difficulty, trainerId, onSuccess);
    }

    handleDeleteClassSchedule(id) {
        console.log("delete class");
        const {monday, sunday} = this.state;
        const onSuccess = (responseData) => {
            this.loadSchedule(monday, sunday);
        };
        deleteClassSchedule(id, onSuccess);
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
