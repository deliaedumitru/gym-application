import React, {Component} from 'react';
import SubscriptionItem from "../SubscriptionItem/index";
import './style.css'

export default class SubscriptionTable extends Component {
    render() {
        const {subscriptions, toggleModal, setSubscription, admin, handleEditSubscription} = this.props;

        return (
            <div id='subscriptions-container'>
                {
                    subscriptions ?
                        subscriptions.map((subscription) => (
                            <SubscriptionItem
                                subscription={subscription}
                                openModal={toggleModal}
                                setSubscription={setSubscription}
                                handleEditSubscription={handleEditSubscription}
                                admin={admin}
                            />
                        ))
                        : null
                }
            </div>
        )
    }
}