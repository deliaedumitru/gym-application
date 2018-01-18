import React, {Component} from 'react';
import moment from 'moment';
import 'moment-timezone';
import {Button} from "react-bootstrap";
import './style.css'

export default class PersonalScheduleItem extends Component {
    render() {
        console.log(this.props);
        const colors = {
            'ADVANCED': 'rgba(230, 46, 0, 0.5)',
            'INTERMEDIATE': 'rgba(230, 230, 0, 0.5)',
            'BEGINNER': 'rgba(0, 102, 0, 0.5)',
        };

        const {personalSchedule: {PersonalName: name, Room: room,  Date: date, Difficulty: difficulty, TrainerName: trainerName}} = this.props;

        const endDate = moment(date).add(1, 'hour');
        const start = moment(date).tz("Europe/Bucharest").format("HH:mm");
        const end = moment(endDate).tz("Europe/Bucharest").format("HH:mm");
        return (
            <div className="personal-schedule" style={{backgroundColor: colors[difficulty], borderRadius: 10, textAlign: 'center', fontSize: 14}}>
                <h3>{name}</h3>
                <p>
                    Room {room}
                    <br/>
                    {trainerName}
                    <br/>
                    {start} - {end}
                </p>

            </div>
        );
    }
}
