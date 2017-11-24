import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'


export class ClassSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeClass = this.handleChangeClass.bind(this);
        this.handleChangeTrainer = this.handleChangeTrainer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCapacityChange = this.handleCapacityChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);

        this.loadClasses();
        this.loadTrainers();

        this.state = {
            selectedOption: '',
            startDate: moment(),
            capacity: '',
            selectedTrainer: '',
            selectedDifficulty: '1'
        };
    }

    loadTrainers() {
        fetch('http://localhost:63288/api/trainers', {
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
        fetch('http://localhost:63288/api/classes', {
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

    handleChangeClass(selectedClass) {
        this.setState({selectedClass});
        selectedClass && console.log(`Class: ${selectedClass.label}`);
    };

    handleChangeTrainer(selectedTrainer) {
        this.setState({selectedTrainer});
        selectedTrainer && console.log(`Class: ${selectedTrainer.label}`);
    }

    handleChangeDate(date) {
        console.log("Date:", date);
        this.setState(() => ({
            startDate: date
        }));
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });
    }

    handleCapacityChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
            [name]: event.target.validity.valid ? value : this.state.capacity
        });
    }

    handleDifficultyChange(changeEvent) {
        this.setState({
            selectedDifficulty: changeEvent.target.value
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const {selectedTrainer, selectedClass, capacity, room, selectedDifficulty, startDate} = this.state;
        console.log("Submit");
        console.log("class = ", selectedClass);
        console.log("capacity = ", capacity);
        console.log("room = ", room);
        console.log("difficulty = ", selectedDifficulty);
        const date = startDate.format("YYYY-MM-DD HH:mm:ss");
        console.log("date = ", date);
        console.log("trainer = ", selectedTrainer);


        fetch('http://localhost:63288/api/ClassSchedules', {
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
                Difficulty: selectedDifficulty,
                TrainerId: selectedTrainer.value,
            })
        }).then((response) => response.json()).then((responseJson) => {
            console.log("Success:", responseJson);
            alert("Class added");
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const {trainers, selectedTrainer, classes, selectedClass, capacity, room, selectedDifficulty, startDate} = this.state;
        console.log("classes:", classes);
        console.log("selected option:", selectedClass);

        const classSelection = (
            <label>
                Class:
                <Select
                    name="form-field-name"
                    value={selectedClass && selectedClass.value}
                    onChange={this.handleChangeClass}
                    options={classes}
                    wrapperStyle={{left: '45%', width: 150}}
                />
            </label>
        );

        const trainerSelection = (
            <label>
                Trainer:
                <Select
                    name="form-field-name"
                    value={selectedTrainer && selectedTrainer.value}
                    onChange={this.handleChangeTrainer}
                    options={trainers}
                    wrapperStyle={{left: '45%', width: 150}}
                />
            </label>
        );

        const datePicker = (
            <label>
                Date:
                <DatePicker
                    selected={startDate}
                    onChange={this.handleChangeDate}
                    shouldCloseOnSelect={false}
                />
            </label>
        );

        const difficultySelection = (
            <label>
                Difficulty:
                <br/>
                <input type="radio" value="1"
                       checked={selectedDifficulty === '1'}
                       onChange={this.handleDifficultyChange}/>
                Beginner
                <input type="radio" value="2"
                       checked={selectedDifficulty === '2'}
                       onChange={this.handleDifficultyChange}/>
                Intermediate
                <input type="radio" value="3"
                       checked={selectedDifficulty === '3'}
                       onChange={this.handleDifficultyChange}/>
                Advanced
            </label>
        );

        const roomInput = (
            <label>
                Room:
                <br/>
                <input name='room' type="text" value={room} onChange={this.handleInputChange}/>
            </label>
        );

        const capacityInput = (
            <label>
                Capacity:
                <br/>
                <input name='capacity' pattern="[0-9]*" type="text" value={capacity}
                       onChange={this.handleCapacityChange}/>
            </label>
        );

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {classSelection}
                    <br/><br/>
                    {capacityInput}
                    <br/><br/>
                    {roomInput}
                    <br/><br/>
                    {difficultySelection}
                    <br/><br/>
                    {trainerSelection}
                    <br/><br/>
                    {datePicker}
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>


            </div>
        );
    }
}
