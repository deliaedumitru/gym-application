import React, {Component} from 'react';
import Schedule from '../ScheduleUser/index.js';

export default class UserDashboard extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<Schedule />
		);
	}
}