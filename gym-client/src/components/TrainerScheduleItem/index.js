/**
 * Created by IT on 29/12/2017.
 */
import React, {Component} from 'react';
import {Button} from "react-bootstrap";
import moment from 'moment';
import 'moment-timezone';
import './style.css'

export default class TrainerScheduleItem extends Component {
    render() {
        console.log(this.props);

        const {handleDelete, trainerSchedule: {Id: id, numeParticipant: numeParticipant, Capacity: capacity, Date: date, Room: room }} = this.props;

        const endDate = moment(date).add(1, 'hour');
        const start = moment(date).tz("Europe/Bucharest").format("HH:mm");
        const end = moment(endDate).tz("Europe/Bucharest").format("HH:mm");
        return (
            <div className="trainer-schedule" style={{borderRadius: 10, textAlign: 'center', fontSize: 14,margin:5,backgroundColor:'rgba(250, 250, 250, 0.4)'}}>
                <h3>With: {numeParticipant}</h3>
                <p>
                    Room {room}
                    <br/>
                    {start} - {end}
                    <br/>
                    <button
                        style={{backgroundColor:'rgba(250, 250, 250, 0.4)',width:'100%'}}
                        className='btn'
                        onClick={() => handleDelete(id)}>
                        delete
                    </button>
                </p>
            </div>
        );
    }
}