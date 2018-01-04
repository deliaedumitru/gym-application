import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';

import './style.css'

export default class ClassScheduleForm extends Component {
    constructor(props) {
        super(props);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeClass = this.handleChangeClass.bind(this);
        this.handleChangeTrainer = this.handleChangeTrainer.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCapacityChange = this.handleCapacityChange.bind(this);
        this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            selectedOption: '',
            startDate: moment(),
            capacity: '',
            selectedTrainer: '',
            selectedDifficulty: '1'
        };
    }

    handleChangeClass(selectedClass) {
        this.setState({selectedClass});
        //selectedClass && console.log(`Class: ${selectedClass.label}`);
    };

    handleChangeTrainer(selectedTrainer) {
        this.setState({selectedTrainer});
        //selectedTrainer && console.log(`Class: ${selectedTrainer.label}`);
    }

    handleChangeDate(date) {
        //console.log("Date:", date);
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
        //console.log("difficulty change", changeEvent.target.value);
        this.setState({
            selectedDifficulty: changeEvent.target.value
        });
    }

    handleSubmit(event) {
        const {handleSubmit} = this.props;
        const {selectedTrainer, selectedClass, capacity, room, selectedDifficulty, startDate} = this.state;
        handleSubmit(event, selectedTrainer, selectedClass, capacity, room, selectedDifficulty, startDate);
    }

    filterDate(day) {
        return !(day.day() === 0 || day.day() === 6 || day.isBefore(moment()));
    }


    render() {
        const {selectedTrainer, selectedClass, capacity, room, selectedDifficulty, startDate} = this.state;
        const {trainers, classes} = this.props;

        const classSelection = (
            <label className="select-container">
                Class:
                <Select
                    name="form-field-name"
                    value={selectedClass && selectedClass.value}
                    onChange={this.handleChangeClass}
                    options={classes}
                    wrapperStyle={{width: 150}}
                />
            </label>
        );

        const trainerSelection = (
            <label className="select-container">
                Trainer:
                <Select
                    name="form-field-name"
                    value={selectedTrainer && selectedTrainer.value}
                    onChange={this.handleChangeTrainer}
                    options={trainers}
                    wrapperStyle={{alignSelf: 'center', width: 150}}
                />
            </label>
        );

        const datePicker = (
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={this.handleChangeDate}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="DD-MMM-YYYY HH:mm"
                    filterDate={this.filterDate}
                />
            </div>
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
        )
    }
}