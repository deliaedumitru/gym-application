import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';
import { Grid, Row, Col } from "react-bootstrap";
import 'whatwg-fetch';

import { SERVER, TRAINERS, FEEDBACK } from "../../api/gym";

import './style.css'

export default class TrainerProfile extends Component {
    constructor(props) {
        super(props);
        this.giveFeedback = this.giveFeedback.bind(this);
        this.getTrainerDetails = this.getTrainerDetails.bind(this);
        this.getFeedbacks = this.getFeedbacks.bind(this);
        this.onStarClick = this.onStarClick.bind(this);

        this.state = {
            userInfo: null,
            rating: 0,
            feedbacks: []
        };

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
        this.trainerId = this.props.match.params.id;
    }

    shouldComponentUpdate() {
        console.log("TrainerProfile: should component update");
        return true;
    }

    componentDidMount() {
        console.log("TrainerProfile: component did mount");
        this.getTrainerDetails();
        this.getFeedbacks();
    }

    getTrainerDetails() {
            fetch(`${SERVER}${TRAINERS}/` + this.trainerId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response =>{
             if (!response.ok) {
                 //TODO: REDIRECT TO NOT FOUND
                throw Error(response.statusText);
            }
            return response.json()
        }).then(responseData => {
            this.setState({userInfo: responseData});
            console.log(this.state.userInfo);
        }).catch((error) => {
            console.error(error);
        });
    }

    getFeedbacks() {
         fetch(`${SERVER}${FEEDBACK}/` + this.trainerId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response =>{
             if (!response.ok) {
                 //TODO: REDIRECT TO NOT FOUND
                throw Error(response.statusText);
            }
            return response.json()
        }).then(responseData => {
            console.log(responseData);
            this.setState({feedbacks: responseData});
        }).catch((error) => {
            console.error(error);
        });
    }

    giveFeedback(event) {
        if (this.userId) {
            event.preventDefault();
            const form = event.target;
            const data = new FormData(form);

            const comment = data.get('text');
            
            fetch(`${SERVER}${FEEDBACK}/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    TrainerId: this.trainerId,
                    UserId: this.userId,
                    Text: comment,
                    Rating: this.state.rating
                })
            }).then(response =>{
                if (!response.ok) {
                    //TODO: REDIRECT TO NOT FOUND
                    throw Error(response.statusText);
                }
                return response.json()
            }).then(responseData => {
                this.setState({userInfo: responseData});
                console.log(this.state.userInfo);
            }).catch((error) => {
                console.error(error);
            });
        } else {
            //SHOW ERROR MESSAGE: NOT LOGGED IN!
            console.log("not logged in!!")
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    
    render() {
        const { userInfo } = this.state;
        const { rating } = this.state;
        const { feedbacks } = this.state;
        console.log(feedbacks);
        return (
            <div>
                <div className="profile">
                        {userInfo ?
                            <div>
                                <div className="info">
                                    <div className="profile-photo"></div>
                                    <div className="profile-info">
                                        <h1>{userInfo.Name}</h1>
                                        <p>Lorem ipsum ceva descriere.</p>
                                    </div>
                                </div> 
                                {this.userId ?
                                    <div className="feedback">
                                        <h2>Leave your feedback </h2>
                                        <div style={{fontSize: 26}}>
                                            <StarRatingComponent 
                                                name="rate1" 
                                                starCount={5}
                                                value={rating}
                                                onStarClick={this.onStarClick}
                                                starColor="#6267bb"
                                                emptyStarColor="#acb2c9"
                                                renderStarIcon={() => <span className="stararea">★</span>}
                                            />
                                        </div>
                                        <form onSubmit={this.giveFeedback}>
                                            <textarea id="text" name="text" className="input" placeholder="Comment"></textarea>
                                            <input type="submit" value="SUBMIT"/>
                                        </form>
                                    </div> : null
                                }

                                {feedbacks ? 
                                    <div className="feedback">
                                        <h2>Feedback</h2>
                                        {feedbacks.map((elem) => 
                                            { 
                                                return(
                                                    <article key={elem.Id}>
                                                        <h4>{elem.Username}</h4>
                                                        <time>date</time> <br/>
                                                        
                                                        <div style={{fontSize: 26}}>
                                                        <StarRatingComponent 
                                                            name="rate1" 
                                                            starCount={5}
                                                            value={elem.Rating}
                                                            starColor="#6267bb"
                                                            emptyStarColor="#acb2c9"
                                                            renderStarIcon={() => <span className="stararea">★</span>}
                                                            editing={false}
                                                        />
                                                        </div>
                                                        <p>{elem.Text}</p>
                                                    </article>
                                                    )
                                            })
                                        }
                                    </div> : <div className="feedback">
                                        <h2>There is no feedback for this trainer!</h2> </div>
                                }
                            </div> : null
                        }
                </div>
                <br/><br/><br/>
            </div>
        )
    }
}
