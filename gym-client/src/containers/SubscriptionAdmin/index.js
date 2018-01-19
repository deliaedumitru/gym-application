import React, {Component} from 'react';
import {PURCHASE_SUBSCRIPTION, SERVER, SUBSCRIPTION, SUBSCRIPTIONS} from "../../api/gym";
import './style.css'
import Modal from "../../components/Modal/index";
import SubscriptionTable from "../../components/SubscriptionsTable/index";
import SubscriptionItem from "../../components/SubscriptionItem/index";
import ErrorModal from "../../components/ErrorModal/index";

export default class SubscriptionAdmin extends Component {
    constructor(props) {
        super(props);
        this.loadSubscriptions = this.loadSubscriptions.bind(this);
        this.handleEditSubscription = this.handleEditSubscription.bind(this);
        this.handleAddSubscription = this.handleAddSubscription.bind(this);

        this.state = {
            subscriptions: [],
            subscription: null,

            isOpen: true,
            errorMsg: null,
            errorStack: null,
            showClose: true
        };

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
    }

    loadSubscriptions() {
        console.log("load subscriptions");
        fetch(`${SERVER}${SUBSCRIPTIONS}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
        }).then(response => response.json()).then(responseData => {
            this.setState({subscriptions: responseData});
        }).catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        console.log("component did mount");
        this.loadSubscriptions();
    }

    handleEditSubscription = (id, name, description, price) => {
        fetch(`${SERVER}${SUBSCRIPTION}/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json'
            }, body: JSON.stringify({
                Id: id,
                Name: name,
                Price: price,
            })
        }).then(response => {
            if (response.status === 200) {
                alert("OK!!");
                this.setState((prevState) => ({
                    subscriptions: prevState.subscriptions.map((it) => {
                        if (it.Id === id) {
                            return {
                                ...it,
                                Name: name,
                                Price: price,
                            }
                        }
                        return it;
                    })
                }))
            } else {
                throw Error(response.statusText);
            }
        }).catch((error) => {
            console.error(error);
            this.setState({errorMsg:  `There was an error while updating the subscription!`});
            this.setState({errorStack:  JSON.stringify(error, Object.getOwnPropertyNames(error))});
            this.setState({isOpen: true});
            this.setState({showClose: true});
        });
    };

    handleAddSubscription(name, description, price) {
        fetch(`${SERVER}${SUBSCRIPTION}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }, body: JSON.stringify({
                Id: 0,
                Name: name,
                Price: price,
            })
        }).then(response => {
            if (response.status === 200) {
                alert("OK!!");
                this.setState((prevState) => {
                    const {subscriptions} = prevState;
                    subscriptions.push({Id: 0, Name: name, Price: price});
                    return {subscriptions};
                })
            } else {
                throw Error(response.statusText);
            }
        }).catch((error) => {
            console.error(error);
            if(name === null || description === null || price === null ) {
                this.setState({errorMsg:  `There was an error while adding the subscription! Make sure all textboxes are completed!`});
            } else this.setState({errorMsg:  `There was an error while adding the subscription!`});
            this.setState({errorStack:  JSON.stringify(error, Object.getOwnPropertyNames(error))});
            this.setState({isOpen: true});
            this.setState({showClose: true});
        });
    }

    toggleModal = () => {
        this.setState({
            errorMsg: null,
            errorStack: null,
            showClose: true,
            isOpen: !this.state.isOpen
        });
    };


    render() {
        const {subscriptions} = this.state;
        console.log("subscriptions", subscriptions);
        return (
            <div id="main-container" style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <SubscriptionItem
                    subscription={{Id: '', Name: '', Price: ''}}
                    admin
                    add
                    handleAddSubscription={this.handleAddSubscription}
                    style={{backgroundColor: 'white', borderRadius: 5}}
                />
                <SubscriptionTable
                    subscriptions={subscriptions}
                    handleEditSubscription={this.handleEditSubscription}
                    admin
                />

                {this.state.errorMsg ?
                    <ErrorModal show={this.state.isOpen}
                        onClose={this.toggleModal}
                        errorMessage={this.state.errorMsg}
                        errorStack={this.state.errorStack}
                        showClose={this.state.showClose}
                    ></ErrorModal>
                    : null
                }
            </div>
        )
    }
}