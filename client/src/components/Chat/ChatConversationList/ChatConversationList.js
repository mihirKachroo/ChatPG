import React, { Component } from 'react';
import { graphqlOperation, API } from 'aws-amplify';
import { Connect } from 'aws-amplify-react';
import AuthContext from '../../../AuthContext';
import * as queries from '../../../graphql/queries';
import * as subscriptions from '../../../graphql/subscriptions';
import { getUser } from '../../../queryHelper';
import { createConvo } from '../../../mutationHelper';
import './ChatConversationList.css';
import { Button, IconButton, TextField, Grid, CircularProgress, Typography, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

/**
 * Chat conversations list component to lead user to messages from other users
 */

class ChatConversationList extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, email: null };
    }

    createConversationClick = async (event) => {
        event.preventDefault();
        const userExists = await getUser(this.state.email);

        if (!userExists) {
            this.handleClose()
            alert("User Doesn't Exist on App")
        }
        else {
            await createConvo(this.state.email, this.context.attributes.email)
            alert("Conversation Created")
            this.handleClose()
        }
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    static contextType = AuthContext;

    render() {
        const username = this.context ? this.context.attributes.email : null;
        return (
            <div>
                <Grid container direction='row' justifyContent='space-between' alignItems='center' style={{ paddingLeft: '15px', backgroundColor: '#cfcfcf' }}>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Conversations
                    </Typography>
                    <IconButton onClick={this.handleOpen} >
                        <AddIcon style={{ fontSize: 30, marginBottom: 5 }} />
                    </IconButton>
                </Grid>
                <div className="convo-list">
                    <div className="list-group mb-2">
                        {
                            username ?
                                <Connect
                                    query={graphqlOperation(queries.GetUserAndConversations, { id: username })}
                                    subscription={graphqlOperation(subscriptions.OnCreateUserConversation, {
                                        userId: username
                                    })}
                                    onSubscriptionMsg={(prev, { onCreateConvoLink }) => {
                                        try {
                                            prev.getUser.conversations.items.push(onCreateConvoLink);
                                        } catch (e) {
                                            console.log('Failed to merge user conversation subscription');
                                        }
                                        return prev;
                                    }}
                                >
                                    {({ data, loading, error }) => {
                                        const { getUser } = data || { getUser: { conversations: [] } }
                                        if (error) return (<h3>Error: {error}</h3>);
                                        let userConversations;
                                        try {
                                            userConversations = getUser.conversations.items;
                                        } catch (e) {
                                            userConversations = [];
                                        }
                                        if (loading || !userConversations) return (<div style={{ display: 'flex', justifyContent: 'center', marginTop: 25 }}><CircularProgress /></div>);
                                        return userConversations.map((userConversation, i) => (
                                            <a
                                                key={i}
                                                className={this.conversationClassNames()}
                                                onClick={() => this.props.onChatSelected(userConversation.conversation)}>
                                                {userConversation.conversation.name.replace(' and ', '').replace(username, '')}
                                            </a>
                                        ));
                                    }}
                                </Connect> : null
                        }
                    </div>
                </div>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Enter User's Email</DialogTitle>
                    <form onSubmit={this.createConversationClick}>
                        <DialogContent>
                            <DialogContentText>
                                Enter the email of the user you would like to chat with!
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleEmailChange}
                                required
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button type='button' onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type='submit' color="primary">
                                Chat
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

            </div>
        );
    }

    conversationClassNames = (id) => {
        return "list-group-item list-group-item-action p-3 border-0"
    }
}

export default ChatConversationList;
