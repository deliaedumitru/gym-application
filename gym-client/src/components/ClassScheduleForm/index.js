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
            <label className="select-container" style={{color: '#48476a'}}>
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
            <label className="select-container" style={{color: '#48476a'}}>
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
            <div className="wrapInput">
                Date:
                <br/>
                <DatePicker
                    customInput={<ExampleCustomInput/>}
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
            <div style={{color: '#48476a'}}>
                Difficulty:
                <br/>
                <input type="radio" value="1"
                       checked={selectedDifficulty === '1'}
                       onChange={this.handleDifficultyChange}/>
                Beginner
                <br/>
                <input type="radio" value="2"
                       checked={selectedDifficulty === '2'}
                       onChange={this.handleDifficultyChange}/>
                Intermediate
                <br/>
                <input type="radio" value="3"
                       checked={selectedDifficulty === '3'}
                       onChange={this.handleDifficultyChange}/>
                Advanced
            </div>
        );

        const roomInput = (
            <div className="wrapInput">
                Room:
                <br/>
                <input className="input100" name='room' type="text" value={room} onChange={this.handleInputChange}/>
            </div>
        );

        const capacityInput = (
            <div className="wrapInput">
                Capacity:
                <br/>
                <input className="input100" name='capacity' pattern="[0-9]*" type="text" value={capacity}
                       onChange={this.handleCapacityChange}/>
            </div>
        );

        return (
            <div style={{
                marginRight: 10,
                marginLeft: 10,
                backgroundColor: 'rgba(250, 250, 250, 0.7)',
                borderRadius: 10,
                paddingTop: 20,
                display: 'flex',
                flexDirection:'column',
                textAlign: 'center'
            }}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {classSelection}
                    {trainerSelection}
                </div>
                <br/>
                {capacityInput}
                <br/>
                {roomInput}
                <br/>
                {datePicker}
                <br/>
                {difficultySelection}
                <br/>
                <button id="submit-btn" onClick={this.handleSubmit}>Add</button>
            </div>
        )
    }
}

class ExampleCustomInput extends React.Component {
    render() {
        return (
            <button
                className="input100"
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}