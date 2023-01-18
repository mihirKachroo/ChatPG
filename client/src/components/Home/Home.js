import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react';
import { createUser } from '../../mutationHelper';
import { getUser } from '../../queryHelper';
import awsExports from '../../aws-exports';
import './Home.css';

/**
 * Homepage for chat
 */

const authErrorMessageMapper = (message) => {
    if (/incorrect.*username.*password/i.test(message)) {
        return 'Incorrect username or password';
    }
    return message;
}

class Home extends Component {

    render() {
        return (
            <div className="container home card bg-light">
                <div className="card-body">
                    <h1 className="card-title display-4 text-center">ChatPG</h1>
                    <p className="home-subtitle display-4 text-center">Real-time messaging app that keeps conversations PG-13 by censoring messages before they are sen</p>
                    <Authenticator
                        onStateChange={this.handleAuthStateChange}
                        amplifyConfig={awsExports}
                        errorMessage={authErrorMessageMapper}
                    />
                </div>
            </div>
        );
    }

    handleAuthStateChange = async (state) => {
        if (state === 'signedIn') {
            const cognitoUser = await Auth.currentAuthenticatedUser();
            const userExists = await getUser(cognitoUser.attributes.email);
            if (!userExists) {
                const createdUser = await createUser({ id: cognitoUser.attributes.email, username: cognitoUser.attributes.email });
                this.props.onLogin(cognitoUser);
            } else {
                this.props.onLogin(cognitoUser);
            }
        }
    }
}

export default Home;
