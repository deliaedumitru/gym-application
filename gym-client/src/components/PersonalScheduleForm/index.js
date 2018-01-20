import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import moment from 'moment';

import './style.css'

export default class PersonalScheduleForm extends Component {
    constructor(props) {
        super(props);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            room: '',
            startDate: moment(),            
            selectedUser: '',
        };
    }

    handleChangeUser(selectedUser) {
        this.setState({selectedUser});
        //selectedUser && console.log(`Class: ${selectedUser.label}`);
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

    handleSubmit(event) {
        const {handleSubmit} = this.props;
        const {selectedUser, room, startDate} = this.state;
        handleSubmit(event, selectedUser, room, startDate);
    }

    filterDate(day) {
        return !(day.day() === 0 || day.day() === 6 || day.isBefore(moment()));
    }


    render() {
        const {selectedUser, room, startDate} = this.state;
        const {users} = this.props;

        const userSelection = (
            <label className="select-container">
                User:
                <Select
                    name="form-field-name"
                    value={selectedUser && selectedUser.value}
                    onChange={this.handleChangeUser}
                    options={users}
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

        const roomInput = (
            <label>
                Room:
                <br/>
                <input name='room' type="text" value={room} onChange={this.handleInputChange}/>
            </label>
        );

        return (
            <form onSubmit={this.handleSubmit}>
                {roomInput}
                <br/><br/>
                {userSelection}
                <br/><br/>
                {datePicker}
                <br/><br/>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}