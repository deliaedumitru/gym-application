/**
 * Created by IT on 29/12/2017.
 */
import React, {Component} from 'react';
import moment from 'moment';
import 'moment-timezone';
import './style.css'

export default class TrainerScheduleItem extends Component {
    render() {
        console.log(this.props);

        const {trainerSchedule: {Id: id, numeParticipant: numeParticipant, Capacity: capacity, Date: date, Room: room }} = this.props;

        const endDate = moment(date).add(1, 'hour');
        const start = moment(date).tz("Europe/Bucharest").format("HH:mm");
        const end = moment(endDate).tz("Europe/Bucharest").format("HH:mm");
        return (
            <div className="trainer-schedule" style={{borderRadius: 10, textAlign: 'center', fontSize: 14}}>
                <h3>Cu: {numeParticipant}</h3>
                <p>
                    Room {room}
                    <br/>
                    {start} - {end}
                </p>
            </div>
        );
    }
}