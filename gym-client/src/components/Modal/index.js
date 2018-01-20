import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import creditCard from '../../images/credit-card.png';
import FaClose from 'react-icons/lib/fa/close';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeMonth = this.handleChangeMonth.bind(this);
        this.handleChangeYear = this.handleChangeYear.bind(this);

        this.state = {
            cardNumber: null,
            securityNumber: null,
            selectedMonth: '1',
            selectedYear: 2018,
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

    handleChangeMonth(selectedMonth) {
        this.setState({selectedMonth});

    }

    handleChangeYear(selectedYear) {
        this.setState({selectedYear})
    }

    render() {
        const months = [];
        const years = [];
        for (let i = 1; i < 101; i++) {
            const year = 1999 + i;
            years.push({value: year, label: year});

            if (i <= 12) {
                months.push({value: i, label: i});
            }
        }


        const {cardNumber, selectedMonth, selectedYear, securityNumber} = this.state;
        const {handlePurchase} = this.props;

        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: '8%',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 500,
            minHeight: 300,
            margin: '0 auto',
            padding: 30,
            marginTop: '5%',
        };

        const cardNumberInput = (
            <input style={{width: '100%', height: 30}} placeholder='Credit card number' name='cardNumber'
                   pattern="[0-9]*"
                   type="text" value={cardNumber}
                   onChange={this.handleInputChange}/>
        );

        const securityNumberInput = (
            <input style={{width: '100%', height: 30}} placeholder='Security number' name='securityNumber'
                   pattern="[0-9]*"
                   type="text" value={securityNumber}
                   onChange={this.handleInputChange}/>
        );

        const monthSelection = (
            <Select
                name="form-field-name"
                value={selectedMonth && selectedMonth.value}
                onChange={this.handleChangeMonth}
                options={months}
                wrapperStyle={{alignSelf: 'center', width: 150}}
            />
        );

        const yearSelection = (
            <Select
                name="form-field-name"
                value={selectedYear && selectedYear.value}
                onChange={this.handleChangeYear}
                options={years}
                wrapperStyle={{alignSelf: 'center', width: 150}}
            />
        );

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    <div className="header" style={{display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'}}>
                        <FaClose onClick={this.props.onClose}/>
                    </div>
                    <div>
                        <img src={creditCard} alt="credit card image" style={{width: '70%', height: '10%'}}/>
                    </div>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{width: '70%', marginRight: 20}}>
                            {cardNumberInput}
                        </div>
                        <div style={{width: '30%'}}>
                            {securityNumberInput}
                        </div>
                    </div>
                    <br/>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        Expiration date:
                        <div>
                            {monthSelection}
                        </div>
                        <div>
                            {yearSelection}
                        </div>
                    </div>
                    <br/><br/>
                    <div id='button-container' style={{alignSelf: 'flex-end'}}>
                        <button onClick={handlePurchase} id='purchase-button'
                                style={{backgroundImage: "linear-gradient(to right, #748ccc 0%, #98c2f1 51%, #748ccc 100%)"}}>
                            Purchase
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;