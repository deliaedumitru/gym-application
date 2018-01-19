import React from 'react';
import PropTypes from 'prop-types';
import FaClose from 'react-icons/lib/fa/close';

class ErrorModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

     render() {
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
            minHeight: 100,
            margin: '0 auto',
            padding: 30,
            marginTop:'5%',
            overflow: 'auto',
        };

        const mainMessage = {
           fontSize: '20px'
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    <div className="header">
                    {this.props.showClose ?
                        <FaClose onClick={this.props.onClose}/> : null
                    }
                    </div>
                    <br/>
                    <div style={mainMessage}>
                        {this.props.errorMessage}
                    </div>
                    <br/>
                    {this.props.errorStack ?
                        <div>
                            {this.props.errorStack}
                        </div> : null
                    }
                </div>
            </div>
        );
    }
}

ErrorModal.propTypes = {
    onClose: PropTypes.func,
    errorMessage: PropTypes.string,
    errorStack: PropTypes.string,
    show: PropTypes.bool,
    showClose: PropTypes.bool
};

export default ErrorModal;