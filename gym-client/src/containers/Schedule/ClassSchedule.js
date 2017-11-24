import React from 'react';
import './ClassSchedule.css';

const ClassSchedule = props => {
    

    return(
        <li key={props.scheduleId}>
            <h3>{props.name}</h3>
            <p>{props.date}</p>
            <p>Room {props.room} <br/>
            {props.capacity} places left</p>
            <button type="button" className="btn" onClick={props.click}>Sign up</button>
        </li>
    );
}

export default ClassSchedule