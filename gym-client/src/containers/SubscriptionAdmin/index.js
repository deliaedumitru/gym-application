import React, {Component} from 'react';
import {addSubscription, editSubscription, getSubscriptions} from "../../api/gym";
import './style.css'
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
        getSubscriptions((responseData)=> this.setState({subscriptions: responseData}));
    }

    componentDidMount() {
        console.log("component did mount");
        this.loadSubscriptions();
    }

    handleEditSubscription = (id, name, description, price) => {
        const onSuccess = (response) => {
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
        };
        editSubscription(id, name, price, onSuccess);
    };

    handleAddSubscription(name, description, price) {
        const id = 0;
        addSubscription(id, name, price, ()=>this.loadSubscriptions());
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