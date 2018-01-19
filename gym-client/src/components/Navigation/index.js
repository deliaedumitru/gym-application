import {HashRouter, NavLink, Route} from "react-router-dom";
import React from "react";

/**
 * Navbar component, return the nab object, with the
 * given destination and titles. Purely presentational.
 * @param items list of {path, title} objects
 * @returns compoenent
 * @constructor
 */
const NavBar = ({items}) => (
    <div style={{boxSizing: 'unset', fontSize: 15, color: 'black'}} className="gym-navbar">
        <ul style={{
            padding:0,
            margin: 0,
            width: '10%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }} className="logoul">
            <li>Gym App</li>
        </ul>
        <ul style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            margin: 0,
            boxSizing: 'unset',
            fontSize: 15,
            color: 'black',
        }}
            className="gym-header">
            {items.map(({path, title}) =>
                <li className="pages"><NavLink exact to={path}>{title}</NavLink></li>
            )}
        </ul>
    </div>
);

/**
 * Navigation content component. Receives items
 * with {path, component} to add to the content.
 * @param items
 * @returns {*}
 * @constructor
 */
const NavigationContent = ({items}) => (
    <div className="content">
        <Route exact path={items[0].path} component={items[0].component} />
        {items.slice(1).map(({path, component}) =>
            <Route path={path} component={component} />
        )}
    </div>
);

/**
 * Navigation component. Contains all the navigation logic
 * Receives items (path, title, component}. If the title is unspecified
 * for an item, it is added to navigation, but not presented in the navbar.
 * @param items
 * @returns {*}
 * @constructor
 */
export const Navigation = ({items}) => (
    <HashRouter>
        <div className="gym-container">
            <NavBar items={items.filter(({title}) => title !== undefined)} />
            <NavigationContent items={items} />
        </div>
    </HashRouter>
);

