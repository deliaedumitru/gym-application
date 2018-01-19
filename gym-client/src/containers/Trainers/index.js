import React, {Component} from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import 'whatwg-fetch';

import { SERVER, TRAINERS } from "../../api/gym";

import './style.css'

export default class Trainers extends Component {
    constructor(props) {
        super(props);
        this.getTrainers = this.getTrainers.bind(this);

        this.state = {
            trainers: []
        };

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
    }

    shouldComponentUpdate() {
        console.log("Trainers: should component update");
        return true;
    }

    componentDidMount() {
        console.log("Trainers: component did mount");
        this.getTrainers();
    }

    getTrainers() {
        fetch(`${SERVER}${TRAINERS}/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => response.json()
        ).then(responseData => {
            this.setState({trainers: responseData});
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const { trainers } = this.state
        return(
            <div>
            <div className="trainers-list">
                {trainers ? 
                    <ul className="trainers grid">
                            {trainers.map((elem) => 
                                {
                                    return(
                                        <li key={elem.Id} className="trainer-item">
                                                <div className="trainer-info" style={{"maxHeight": "125px"}}>
                                                    <h1 style={{"maxHeight": "100px"}}>{elem.Name}</h1>
                                                </div>
                                                <Link to={`/trainer/${elem.Id}`} className="active">
                                                    <div className="survey-progress">
                                                        See profile 
                                                    </div>
                                                </Link>
                                        </li>
                                    )
                                })
                            }
                    </ul> : null
                }
            </div>
            </div>
        )
    }

}

//<button type="button" className="go-to">See profile</button>