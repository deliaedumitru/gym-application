import React, {Component} from 'react';
import {Link} from "react-router-dom";
import 'whatwg-fetch';

import {getTrainers} from "../../api/gym";

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
        window.scrollTo(0, 0);
        this.getTrainers();
    }

    getTrainers() {
        getTrainers((resp) =>  this.setState({trainers: resp}));
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
                                        <li className="trainer-item">
                                                <div className="trainer-info" style={{"max-height": "125px"}}>
                                                    <h1 style={{"max-height": "100px"}}>{elem.Name}</h1>
                                                </div>
                                                <Link to={`/trainer/${elem.Id}`} activeClassName="active">
                                                    <div class="survey-progress">
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