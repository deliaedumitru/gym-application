import {logout} from "../../api/gym";
import React, {Component} from "react";


export class LogoutComponent extends Component {
    componentDidMount = () => {
        logout();  // basically removes the token
        window.location.reload();
    };

    render = () => (null);
}