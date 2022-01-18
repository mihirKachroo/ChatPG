import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './Chat.css';
import ChatConversationList from './ChatConversationList/ChatConversationList.js';
import ChatMessageView from './ChatMessageView/ChatMessageView.js';
import ChatInput from './ChatInput/ChatInput.js';
import AuthContext from '../../AuthContext'
import { Grid, Typography, Divider } from '@material-ui/core';

/**
 * Component to tie together the conversation list, message view and input bar
 */

class Chat extends Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedConversation: null
        }
    }

    render() {
        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-sm-4">
                        <div className="left-pane">
                            <div className="row justify-content-center">
                                <div className="col-sm-12">
                                    <ChatConversationList onChatSelected={this.changeConversation} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-8" id="chat">
                        <ChatMessageView conversation={this.state.selectedConversation} />
                        {this.state.selectedConversation &&
                            <ChatInput conversation={this.state.selectedConversation} />
                        }
                    </div>
                </div>
            </div>
        );
    }

    changeConversation = (conversation) => {
        this.setState({
            selectedConversation: conversation
        });
    }
}

export default Chat;
