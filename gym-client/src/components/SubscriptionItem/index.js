import React, {Component} from 'react';
import './style.css'

export default class SubscriptionItem extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);

        const {subscription: {Name, Price}} = props;
        this.state = {
            name: Name,
            price: Price,
            description: '',
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const finalValue = event.target.validity.valid ? value : this.state[name];

        this.setState({
            [name]: finalValue
        });
    }

    render() {
        const {subscription, openModal, setSubscription, admin, handleEditSubscription, add, handleAddSubscription, style} = this.props;
        const {Id, Name, Price} = subscription;

        const {name, description, price} = this.state;

        const nameInput = (
            <input placeholder='Name' name='name'
                   type="text" value={name}
                   style={{
                       width: '100%',
                       fontSize: 'x-large',
                       background: 'transparent',
                       border: 'none',
                       textAlign: 'center'
                   }}
                   onChange={this.handleInputChange}/>
        );

        const descriptionInput = (
            <input placeholder='Description' name='description'
                   type="text" value={description}
                   style={{
                       width: '100%',
                       height: '100%',
                       fontSize: 'medium',
                       background: 'transparent',
                       border: 'none',
                       textAlign: 'center'
                   }}
                   onChange={this.handleInputChange}/>
        );

        const priceInput = (
            <input placeholder='Price' name='price'
                   type="text" value={price}
                   pattern="[0-9]*"
                   style={{
                       width: '100%',
                       fontSize: 'small',
                       background: 'transparent',
                       border: 'none',
                       textAlign: 'center'
                   }}
                   onChange={this.handleInputChange}/>
        );

        return (
            <div id='subscription-container' key={Id}>
                {admin ?
                    <div style={{height: '100%', ...style}}>
                        <div>
                            {nameInput}
                        </div>
                        <div id='details-container'>
                            {descriptionInput}
                        </div>
                        <div>
                            {priceInput}
                        </div>
                        <div id='button-container'>
                            {add ?
                                <button onClick={() => handleAddSubscription(name, description, price)}
                                        id='purchase-button'>
                                    Add
                                </button>
                                : <button onClick={() => handleEditSubscription(Id, name, description, price)}
                                          id='purchase-button'>
                                    Edit
                                </button>
                            }

                        </div>
                    </div>
                    :
                    <div style={{height: '100%'}}>
                        <div id='name-container'>
                            {Name}
                        </div>
                        <div id='details-container'>
                            Details
                            vgregnrd
                            <br/>
                            gftrhdewf
                            jhytjtdy
                            <br/>
                            rergrtg
                            hifjr
                        </div>
                        <div id='price-container'>
                            {Price} €
                        </div>
                        <div id='button-container'>
                            <button onClick={() => {
                                setSubscription(Id);
                                openModal();
                            }} id='purchase-button'>
                                Purchase
                            </button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

