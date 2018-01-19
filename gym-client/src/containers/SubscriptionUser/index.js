import React, {Component} from 'react';
import {PURCHASE_SUBSCRIPTION, SERVER, SUBSCRIPTIONS} from "../../api/gym";
import './style.css'
import Modal from "../../components/Modal/index";
import ErrorModal from "../../components/ErrorModal/index";
import SubscriptionTable from "../../components/SubscriptionsTable/index";


export default class SubscriptionUser extends Component {
    constructor(props) {
        super(props);
        this.loadSubscriptions = this.loadSubscriptions.bind(this);
        this.setSubscription = this.setSubscription.bind(this);
        this.handlePurchase = this.handlePurchase.bind(this);

        this.state = {
            subscriptions: [],
            isOpen: false,
            subscription: null,

            isOpenError: true,
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
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else return response.json()
        }).then(responseData => {
            this.setState({subscriptions: responseData});
        }).catch((error) => {
            console.error(error);
            this.setState({errorMsg:  `There was an error while loading subscriptions!`});
            this.setState({errorStack:  JSON.stringify(error, Object.getOwnPropertyNames(error))});
            this.setState({isOpenError: true});
            this.setState({showClose: true});
        });
    }

    componentDidMount() {
        console.log("component did mount");
        this.loadSubscriptions();
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    toggleModalError = () => {
        this.setState({
            errorMsg: null,
            errorStack: null,
            showClose: true,
            isOpenError: !this.state.isOpenError
        });
    };

    setSubscription = (subscriptionId) => {
        this.setState({subscription: subscriptionId});
    };

    handlePurchase() {
        let current;
        const {subscription} = this.state;

        if (this.userId === null) {
            alert("Please log in");
            return;
        }

        console.log("purchase");
        console.log("load subscriptions");
        //const now = moment();
        const startDate = new Date();
        //now.format("YYYY-MM-DD HH:mm:ss");
        const endDate = new Date();

        const thisMonth = endDate.getMonth();
        endDate.setMonth(thisMonth + 1);
        if (endDate.getMonth() !== thisMonth + 1 && endDate.getMonth() !== 0) {
            endDate.setDate(0);
        }

        fetch(`${SERVER}${PURCHASE_SUBSCRIPTION}`, {
            method: 'Post',
            headers: {
                'Accept': 'application/json'
            }, body: JSON.stringify({
                TypeId: subscription,
                UserId: this.userId,
                StartDate: startDate,
                EndDate: endDate,
            })
        }).then(response => {
            if (response.status === 200) {
                alert("OK!!");
            } else {
                throw Error(response.statusText);
            }
        }).catch((error) => {
            console.error(error);
            this.setState({errorMsg:  `There was an error while purchasing subscription!`});
            this.setState({errorStack:  JSON.stringify(error, Object.getOwnPropertyNames(error))});
            this.setState({isOpenError: true});
            this.setState({showClose: true});
        });
    }

    render() {
        const {subscriptions} = this.state;
        console.log("subscriptions", subscriptions);
        return (
            <div id="main-container">
                <SubscriptionTable
                    subscriptions={subscriptions}
                    toggleModal={this.toggleModal}
                    setSubscription={this.setSubscription}
                />
                <Modal show={this.state.isOpen}
                       onClose={this.toggleModal}
                       handlePurchase={this.handlePurchase}
                >
                </Modal>

                {this.state.errorMsg ?
                    <ErrorModal show={this.state.isOpenError}
                        onClose={this.toggleModalError}
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