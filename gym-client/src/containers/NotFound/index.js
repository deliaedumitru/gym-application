import React, {Component} from 'react';
import { Link } from "react-router-dom";
import 'whatwg-fetch';

import './style.css'

export default class NotFound extends Component {
    render() {
        return(
            <div className="not-found">
                <div className="main-text">
                    <div className="fof">404</div>
                    Oops, the page you're looking for does not exist.<br/>
                    You may want to head back to the homepage.<br/>
                    <Link to={`/`} className="active">
                        <button type="button" className="go-to">Return home</button>
                    </Link>
                </div>
            </div>
        );
    }
}