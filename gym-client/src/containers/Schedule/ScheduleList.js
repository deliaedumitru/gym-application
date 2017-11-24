import React from 'react';
import ClassSchedule from './ClassSchedule.js'
import './ClassSchedule.css';

const ScheduleList = props => {
    const schedule = props.data;
    let classSchedules = schedule.map(classSchedule =>
        <ClassSchedule scheduleId={classSchedule.Id} name={classSchedule.ClassName} key={classSchedule.Id}
            room={classSchedule.Room} capacity={classSchedule.Capacity} date={classSchedule.Date}/>
    );

    return(
        <ul className="timeline">
            {classSchedules}
        </ul>
    );
}

export default ScheduleList