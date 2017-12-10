import React, {Component} from 'react';
import moment from 'moment';
import 'moment-timezone';
import {Button} from "react-bootstrap";
import './style.css'

export default class ClassScheduleItem extends Component {
    render() {
        console.log(this.props);
        const colors = {
            'ADVANCED': 'rgba(230, 46, 0, 0.5)',
            'INTERMEDIATE': 'rgba(230, 230, 0, 0.5)',
            'BEGINNER': 'rgba(0, 102, 0, 0.5)',
        };

        const {crud, handleDeleteClassSchedule, enrollToClassSchedule, unEnrollToClassSchedule, enrolled, classSchedule: {Id: id, ClassName: name, Room: room, AvailableCapacity: capacity, Date: date, Difficulty: difficulty, TrainerName: trainerName}} = this.props;

        const endDate = moment(date).add(1, 'hour');
        const start = moment(date).tz("Europe/Bucharest").format("HH:mm");
        const end = moment(endDate).tz("Europe/Bucharest").format("HH:mm");
        return (
            <div className="class-schedule" style={{backgroundColor: colors[difficulty], borderRadius: 10, textAlign: 'center', fontSize: 14}}>
                <h3>{name}</h3>
                <p>
                    Room {room}
                    <br/>
                    {capacity} places left
                    <br/>
                    {trainerName}
                    <br/>
                    {start} - {end}
                </p>
                {crud ?
                    <Button
                        className="btn"
                        onClick={() => handleDeleteClassSchedule(id)}>
                        delete
                    </Button>
                    : enrolled ?
                        <Button
                            className="btn"
                            onClick={() => unEnrollToClassSchedule(id)}>
                            Leave
                        </Button>
                        : <Button
                            id={id}
                            className="btn"
                            onClick={() => enrollToClassSchedule(id)}>
                            Enroll
                        </Button>
                }
            </div>
        );
    }
}
