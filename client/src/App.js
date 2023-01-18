import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import AppNav from './components/AppNav/AppNav.js'
import Home from './components/Home/Home.js'
import Chat from './components/Chat/Chat.js'
import AuthContext from './AuthContext';

/**
 * Routes webpage to authentication, landing page and chat page
 */

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => {
      this.updateCurrentUser(user)
    });
  }

  updateCurrentUser = (user) => {
    this.setState({
      currentUser: user
    })
  }

  onSignOut = async () => {
    await Auth.signOut();
    this.setState({
      currentUser: null
    })
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.currentUser}>
        <Router>
          <div className="App">
            <AppNav loggedInUser={this.state.currentUser} onSignOut={this.onSignOut} />
            <Route
              exact
              path="/"
              render={() => <Home onLogin={this.updateCurrentUser} />}
            />
            <Route path="/chat" component={Chat} />
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
