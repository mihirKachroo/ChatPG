import React, { Component } from 'react';
import { Connect } from 'aws-amplify-react';
import { Scrollbars } from 'react-custom-scrollbars'
import AuthContext from '../../../AuthContext';
import * as queries from '../../../graphql/queries';
import * as subscriptions from '../../../graphql/subscriptions';
import './ChatMessageView.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChatMessage from './ChatMessage';
import { graphqlOperation } from 'aws-amplify';

/**
 * Chat message view component to see scrollable list of messages
 */

class ChatMessageView extends Component {
    static contextType = AuthContext;

    scrollbarsRef = React.createRef()

    scrollToBottom = () => {
        if (this.scrollbarsRef && this.scrollbarsRef.current) {
            this.scrollbarsRef.current.scrollToBottom()
        }
    }

    componentDidUpdate = async () => {
        this.scrollToBottom();
    }

    render() {
        const username = this.context ? this.context.attributes.email : null
        return (
            <div className="chat-message-view">
                <div className="chat-message-view-header">
                    {this.props.conversation ? this.props.conversation.name.replace(' and ', '').replace(username, '') : 'Open a conversation'}
                </div>
                <div className="chat" ref={this.messagesContainer}>
                    {
                        this.props.conversation ?
                            <Scrollbars
                                autoHide
                                autoHideTimeout={1000}
                                autoHideDuration={200}
                                ref={this.scrollbarsRef}
                            >
                                <Connect
                                    query={graphqlOperation(queries.GetConvo, { id: this.props.conversation.id })}
                                    subscription={graphqlOperation(subscriptions.OnCreateMessage, {
                                        conversationId: this.props.conversation.id
                                    })}
                                    onSubscriptionMsg={(prev, { onCreateMessage }) => {
                                        try {
                                            prev.getConvo.messages.items.push(onCreateMessage);
                                        } catch (e) {
                                            console.log('Failed to merge user conversation subscription');
                                        }
                                        return prev;
                                    }}
                                >
                                    {({ data, loading, error }) => {
                                        const { getConvo } = data || {}
                                        if (error) return (<h3>Error: {error}</h3>);
                                        let messages;
                                        try {
                                            messages = getConvo.messages.items;
                                        } catch (e) {
                                            messages = [];
                                        }
                                        if (loading || !messages) return (<CircularProgress />);
                                        return <div>
                                            {
                                                messages.map((message, i) => (
                                                    <ChatMessage key={i} message={message} isFromMe={message.authorId === username} />
                                                ))
                                            }
                                        </div>
                                    }}
                                </Connect>
                            </Scrollbars> : null
                    }
                </div>
            </div>
        );
    }
}

export default ChatMessageView;
