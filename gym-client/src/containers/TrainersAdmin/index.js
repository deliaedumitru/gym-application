import React, {Component} from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'whatwg-fetch';

import Table from "react-bootstrap/es/Table";
import { SERVER, TRAINERS, USERS } from "../../api/gym";
import { makeTrainer, makeUser } from "../../api/gym";

import './style.css'

export default class TrainersAdmin extends Component {
    constructor(props) {
        super(props);
        this.getUsers = this.getUsers.bind(this);
        this.getButton = this.getButton.bind(this);
        
        this.makeUser = this.makeUser.bind(this);
        this.makeTrainer = this.makeTrainer.bind(this);
        
        this.state = {
            users: null,
        };

        this.roles = [
            'ADMIN',
            'TRAINER',
            'USER'
        ];

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
    }

    componentDidMount() {
        console.log("TrainersAdmin: component did mount");
        this.getUsers();
    }

    getUsers() {
        fetch(`${SERVER}${USERS}/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json()
        ).then(responseData => {
            this.setState({users: responseData});
        }).catch((error) => {
            console.error(error);
        });
    }

    makeTrainer(userId) {
        const onSuccess = (responseData) => {
            const updatedUsers = this.state.users.map((it) => {
                if (it.Id === userId) {
                    return {
                        ...it,
                        Role: 1
                    }
                } else 
                return it;
            }); 
            this.setState({users: updatedUsers});
        }
        makeTrainer(userId, onSuccess);
    }

    makeUser(userId) {
        const onSuccess = (responseData) => {
             const updatedUsers = this.state.users.map((it) => {
                if (it.Id === userId) {
                    return {
                        ...it,
                        Role: 2
                    }
                } else 
                return it;
            }); 
            this.setState({users: updatedUsers});
        }
        makeUser(userId, onSuccess);
    }

    getButton(role, userId) {
        if(role==1) {
            return (
                <button type="button" className="trainers-admin-button" onClick={() => { this.makeUser(userId) }}>
                    make user
                </button>
            )
        } 
        if(role==2) {
            return(
                <button type="button" className="trainers-admin-button" onClick={() => { this.makeTrainer(userId) }}>
                    make trainer
                </button>
            )
        }
    }

render() {
        const { users } = this.state
        return(
            <div className="users">
                <Table responsive className="schedule-table">
                    <thead>
                        <tr className="table-header" style={{backgroundColor: '#404040'}}>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {users ?
                        <tbody>
                            {users.map((elem) => {
                                return (
                                    <tr key={elem.Id}>
                                        <td>
                                            {elem.Username}
                                        </td>
                                        <td>
                                            {elem.Name}
                                        </td>
                                        <td>
                                            {this.roles[elem.Role]}
                                        </td>
                                        <td>
                                            {this.getButton(elem.Role, elem.Id)}
                                        </td>
                                    </tr>
                                )
                                })
                            }
                            
                        </tbody>
                        : null
                    }

                </Table>
            </div>
        )
    }
}