import React from 'react';
import moment from 'moment';
import 'moment-timezone';

class ClassScheduleItem extends React.Component {
    render() {
        var endDate = moment(this.props.date).add(1, 'hour');

        var start = moment(this.props.date).tz("Europe/Bucharest").format("HH:mm");
        var end = moment(endDate).tz("Europe/Bucharest").format("HH:mm");
        return(
            <div>
                <h3>{this.props.name}</h3>
                <p>{start} - {end}</p>
                <p>Room {this.props.room} <br/>
                {this.props.capacity} places left</p>
            </div>
        );
    }
}

export default ClassScheduleItem