import React, {Component} from 'react';
import {getSubscriptions, purchaseSubscription} from "../../api/gym";
import './style.css'
import Modal from "../../components/Modal/index";
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
        };

        const user = JSON.parse(localStorage.getItem("user"));
        this.userId = user ? user.id : null;
    }

    loadSubscriptions() {
        console.log("load subscriptions");
        const onSuccess = (responseData) => {
            this.setState({subscriptions: responseData});
        };
        getSubscriptions(onSuccess);
    }

    componentDidMount() {
        console.log("component did mount");
        window.scrollTo(0, 0);
        this.loadSubscriptions();
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
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

        const userId = this.userId;
        const onSuccess = (responseData) => {
            this.loadSubscriptions();
            alert('Subscription purchased!');
            this.setState({
                ...this.state,
                isOpen: false  // close modal
            });
        };

        purchaseSubscription(subscription, userId, startDate, endDate, onSuccess);
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
            </div>
        )
    }
}