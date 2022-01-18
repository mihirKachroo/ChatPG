import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './AppNav.css';

/**
 * App navigation component for top of webpage
 */

class AppNav extends Component {
    render() {
        if (this.props.location.pathname !== '/' && !this.props.loggedInUser) {
            return <Redirect to="/" />
        } else if (this.props.location.pathname === '/' && this.props.loggedInUser) {
            return <Redirect to="/chat" />
        }
        return (
            <nav className="navbar navbar-primary fixed-top">
                <a className="navbar-brand text-white" href='/'>
                    <strong>WokeTalk</strong>
                </a>
                <ul className="nav navbar-nav">
                    {this.props.loggedInUser &&
                        <li className="nav-item">
                            <span className="nav-user">{this.props.loggedInUser.attributes.email}</span>
                            <button className="btn btn-primary" onClick={this.props.onSignOut}>Log Out</button>
                        </li>
                    }
                </ul>
            </nav>
        );
    }
}

export default withRouter(AppNav);
