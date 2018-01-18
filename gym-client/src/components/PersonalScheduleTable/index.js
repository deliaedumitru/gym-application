import React, {Component} from 'react'

import {SCHEDULE_DETAILS, SERVER} from "../../api/gym";
import {getMonday, getSunday} from "../../containers/DateUtils";
import PersonalScheduleItem from "../../components/PersonalScheduleItem";

import Table from "react-bootstrap/es/Table";
import './style.css'


export default class PersonalScheduleTable extends Component {

    render() {
        const {classes} = this.props;

        console.log("Personal schedule table classes:", classes);
        let mondayClasses = [];
        let tuesdayClasses = [];
        let wednesdayClasses = [];
        let thursdayClasses = [];
        let fridayClasses = [];
        let saturdayClasses = [];

        classes.forEach((personalSchedule) => {
            let scheduleItem = (
                <PersonalScheduleItem
                    key={personalSchedule.Id}
                    personalSchedule={personalSchedule}
                />
            );
            switch (personalSchedule.DayOfWeek) {
                case 'Monday':
                    mondayClasses.push(scheduleItem);
                    break;
                case 'Tuesday':
                    tuesdayClasses.push(scheduleItem);
                    break;
                case 'Wednesday':
                    wednesdayClasses.push(scheduleItem);
                    break;
                case 'Thursday':
                    thursdayClasses.push(scheduleItem);
                    break;
                case 'Friday':
                    fridayClasses.push(scheduleItem);
                    break;
                case 'Saturday':
                    saturdayClasses.push(scheduleItem);
                    break;
                default:
                    break;
            }
        });

        return (
            <div className="responsive-table center">
                <Table responsive className="schedule-table">
                    <thead>
                    <tr className="table-header" style={{backgroundColor: '#404040'}}>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <div className="listOfClassItems">
                                {mondayClasses}
                            </div>
                        </td>
                        <td>
                            <div className="listOfClassItems">
                                {tuesdayClasses}
                            </div>
                        </td>
                        <td>
                            <div className="listOfClassItems">
                                {wednesdayClasses}
                            </div>
                        </td>
                        <td>
                            <div className="listOfClassItems">
                                {thursdayClasses}
                            </div>
                        </td>
                        <td>
                            <div className="listOfClassItems">
                                {fridayClasses}
                            </div>
                        </td>
                        <td>
                            <div className="listOfClassItems">
                                {saturdayClasses}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
