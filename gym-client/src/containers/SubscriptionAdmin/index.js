import React, {Component} from 'react';
import {PURCHASE_SUBSCRIPTION, SERVER, SUBSCRIPTION, SUBSCRIPTIONS} from "../../api/gym";
import './style.css'
import Modal from "../../components/Modal/index";
import SubscriptionTable from "../../components/SubscriptionsTable/index";
import SubscriptionItem from "../../components/SubscriptionItem/index";

export default class SubscriptionAdmin extends Component {
    constructor(props) {
        super(props);
        this.loadSubscriptions = this.loadSubscriptions.bind(this);
        this.handleEditSubscription = this.handleEditSubscription.bind(this);
        this.handleAddSubscription = this.handleAddSubscription.bind(this);

        this.state = {
            subscriptions: [],
            subscription: null,
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
            }
        }).catch((error) => {
            console.error(error);
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
            }
        }).catch((error) => {
            console.error(error);
        });
    }

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
            </div>
        )
    }
}