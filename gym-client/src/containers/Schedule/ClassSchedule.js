import React from 'react';

class ClassSchedule extends React.Component {
    render() {
        return(
            <div>
                <h3>{this.props.name}</h3>
                <p>{this.props.date}</p>
                <p>Room {this.props.room} <br/>
                {this.props.capacity} places left</p>
            </div>
        );
    }
}

export default ClassSchedule