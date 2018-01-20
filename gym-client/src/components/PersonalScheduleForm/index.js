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

    handleSubmit() {
        console.log("handle submit");
        const {handleSubmit} = this.props;
        const {selectedUser, room, startDate} = this.state;
        handleSubmit(selectedUser, room, startDate);
    }

    filterDate(day) {
        return !(day.day() === 0 || day.day() === 6 || day.isBefore(moment()));
    }


    render() {
        const {selectedUser, room, startDate} = this.state;
        const {users} = this.props;

        const userSelection = (
            <label className="select-container" style={{color: '#48476a'}}>
                User:
                <Select
                    name="form-field-name"
                    value={selectedUser && selectedUser.value}
                    onChange={this.handleChangeUser}
                    options={users}
                    wrapperStyle={{alignSelf: 'center', width: '100%'}}
                />
            </label>
        );

        const datePicker = (
            <div className='wrapInput' style={{width: '100%'}}>
                Date:
                <br/>
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
            <div className="wrapInput">
                Room:
                <br/>
                <input className="input100" name='room' type="text" value={room} onChange={this.handleInputChange}/>
            </div>
        );

        return (
            <div style={{
                width: '120%',
                marginLeft: 15,
                backgroundColor: 'rgba(250, 250, 250, 0.7)',
                borderRadius: 10,
                paddingTop: 20,
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
            }}>
                {userSelection}
                <br/><br/>
                {roomInput}
                <br/><br/>
                {datePicker}
                <br/><br/>
                <button id='submit-btn' onClick={this.handleSubmit}>
                    Add
                </button>
            </div>
        )
    }
}

class CustomInput extends React.Component {
    render() {
        return (
            <button
                style={{width: '100%'}}
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}