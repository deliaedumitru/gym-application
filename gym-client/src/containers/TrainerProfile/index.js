import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Moment from 'moment';
import 'whatwg-fetch';

import {addFeedback, editFeedback, getFeebacksForUser, getFeedbacks, getTrainer, getUser} from "../../api/gym";

import './style.css'
import {getUserRole} from "../../utils/UserUtils";


export default class TrainerProfile extends Component {
    constructor(props) {
        super(props);
        this.giveFeedback = this.giveFeedback.bind(this);
        this.getTrainerDetails = this.getTrainerDetails.bind(this);
        this.getFeedbacks = this.getFeedbacks.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
        this.getFeedbackFromUser = this.getFeedbackFromUser.bind(this);
        this.updateFeedback = this.updateFeedback.bind(this);

        this.state = {
            userInfo: null,
            rating: 0,
            feedbacks: [],
            feedbackFromUser: null
        };

        const user = getUser();
        this.userId = user ? user.id : null;
        this.shouldPost = getUserRole() === 'USER';
        this.trainerId = this.props.match.params.id;
    }

    shouldComponentUpdate() {
        console.log("TrainerProfile: should component update");
        return true;
    }

    componentDidMount() {
        console.log("TrainerProfile: component did mount");
        window.scrollTo(0, 0);
        this.getTrainerDetails();
        this.getFeedbackFromUser();
        this.getFeedbacks();
    }

    getTrainerDetails() {
        const trainerId = this.trainerId;
        const onSuccess = (responseData) => {
            this.setState({userInfo: responseData});
            console.log(this.state.userInfo);
        };
        getTrainer(trainerId, onSuccess);
    }

    getFeedbacks() {
        const trainerId = this.trainerId;
        const onSuccess = (responseData) => {
            this.setState({feedbacks: responseData});
        };

        getFeedbacks(trainerId, onSuccess);
    }

    getFeedbackFromUser() {
        if (this.userId) {
            const onSuccess = (responseData) => {
                this.setState({feedbackFromUser: responseData});
                this.setState({rating: responseData.Rating});
            };

            const trainerId = this.trainerId;
            const userId = this.userId;
            getFeebacksForUser(trainerId, userId, onSuccess);
        }
    }

    giveFeedback(event) {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        
        const { feedbackFromUser } = this.state;

        if (this.userId) {
            if(feedbackFromUser===null) {
                //user-ul nu a mai dat feedback => POST
                this.postFeedback(data);
            } else {
                //user-ul a mai dat feedback => PUT
                this.updateFeedback(data);
            }
        } else {
            //SHOW ERROR MESSAGE: NOT LOGGED IN!
            console.log("not logged in!!")
        }
    }

    postFeedback(data, userId = this.userId) {
        const { feedbacks } = this.state;
        const { feedbackFromUser } = this.state;
        const { rating } = this.state; 
        const comment = data.get('textPost');
        const onSuccess = (responseData) => {
            this.setState({feedbackFromUser: responseData});
            this.setState((prevState)=>(
                prevState.feedbacks.push(responseData)
            ));
        };

        if(comment !== null && rating !== 0) {
            const trainerId = this.trainerId;
            addFeedback(trainerId, userId, comment, rating, onSuccess);
        } else {
            //SHOW ERROR MESSAGE: INVALID FEEDBACK
            console.log("invalid feedback!!")
        }
    }

    updateFeedback(data) {
        const { feedbacks } = this.state;
        const { feedbackFromUser } = this.state;
        const { rating } = this.state;
        const comment = data.get('text');

        if(comment != null && rating !== 0) {
            const trainerId = this.trainerId;
            const userId = this.userId;

            const id = feedbackFromUser.Id;
            const onSuccess = (responseData) => {
                this.setState({feedbackFromUser: responseData});
                const updatedFeedback = feedbacks.map((it) => {
                    if (it.Id === feedbackFromUser.Id) {
                        return {
                            ...it,
                            Text: responseData.Text,
                            Rating: responseData.Rating
                        }
                    } else
                        return it;
                });
                this.setState({feedbacks: updatedFeedback});
            };

            editFeedback(trainerId, userId, id, comment, rating, onSuccess);
        } else {
            //SHOW ERROR MESSAGE: INVALID FEEDBACK
            console.log("invalid feedback!!")
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
    
    render() {
        const { userInfo } = this.state;
        const { rating } = this.state;
        const { feedbacks } = this.state;
        const { feedbackFromUser } = this.state;
        var info = '';
        if(userInfo && userInfo.Classes) {
            userInfo.Classes.forEach((elem) => {
                info = info + elem + ' & '
            }); 
        }
        info = info.substring(0, info.length-2);
        console.log(feedbacks);
        return (
            <div>
                <div className="profile">
                        {userInfo ?
                            <div>
                                <div className="info">
                                    <div className="profile-info">
                                        <h1>{userInfo.Name}</h1>
                                        <p>Our <b>{info}</b> trainer.
                                        </p>
                                    </div>
                                    {userInfo.About ?
                                        <div className="profile-about-me">
                                        <h2>About me </h2>
                                        <p>{userInfo.About}</p>
                                        </div> : null
                                    }
                                </div> 
                                {this.shouldPost && this.userId && feedbackFromUser === null ?
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
                                            <textarea id="textPost" name="textPost" className="input" placeholder="Comment"></textarea>
                                            <input type="submit" value="SUBMIT"/>
                                        </form>
                                    </div> : null
                                }

                                {this.shouldPost && this.userId && feedbackFromUser != null ?
                                    <div className="feedback">
                                        <h2>You already left a feedback on this, but you can modify it if you want to.</h2>
                                        <div style={{fontSize: 26}}>
                                            <StarRatingComponent 
                                                name="rate1" 
                                                starCount={5}
                                                value={feedbackFromUser.Rating}
                                                onStarClick={this.onStarClick}
                                                starColor="#6267bb"
                                                emptyStarColor="#acb2c9"
                                                renderStarIcon={() => <span className="stararea">★</span>}
                                            />
                                        </div>
                                        <form onSubmit={this.giveFeedback}>
                                            <textarea id="text" name="text" className="input" placeholder="Comment" defaultValue={feedbackFromUser.Text}></textarea>
                                            <input type="submit" value="UPDATE"/>
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
                                                        <time>{Moment(elem.date).format('d MMM YYYY')}</time> <br/>
                                                        
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

