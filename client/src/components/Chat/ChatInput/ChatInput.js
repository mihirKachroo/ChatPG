import React, { Component } from 'react';
import { API } from 'aws-amplify';
import AuthContext from '../../../AuthContext';
import { Button, Snackbar, Grid, InputBase, IconButton, Card, CardContent, Typography } from '@material-ui/core';
import SendIcon from "@material-ui/icons/Send";
import { createMessage } from '../../../mutationHelper';
import Alert from './Alert';

/**
 * Chat input component to create messages to other users
 */

class ChatInput extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            openError: false,
            errorData: null,
            openWarning: false
        };
    }

    render() {
        return (
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#cfcfcf', padding: 10
            }}>
                < Snackbar anchorOrigin={{
                    vertical: 'top', horizontal: 'right'
                }
                } open={this.state.openError} autoHideDuration={6000} onClose={() => this.setState({ openError: false })}>
                    <Alert onClose={() => this.setState({ openError: false })} severity="error">
                        There was a problem with your message!
                    </Alert>
                </Snackbar >

                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={this.state.openWarning} autoHideDuration={6000} onClose={() => this.setState({ openWarning: false })}>
                    <Alert onClose={() => this.setState({ openWarning: false })} severity="warning">
                        Don't assume pronouns. Use gender neutral language.
                    </Alert>
                </Snackbar>
                {
                    this.state.errorData != null &&
                    <div className="input-group">
                        <Card style={{ width: '100%', maxHeight: 300, textAlign: 'left', marginBottom: 10, overflowY: 'scroll' }}>
                            <CardContent>
                                <Typography style={{ fontSize: 13 }} color="textSecondary" gutterBottom>
                                    Issues with Sentence
                                </Typography>
                                {this.state.errorData.map((item, i) => (
                                    <div style={{ marginBottom: 10 }}>
                                        <Typography variant="h6" style={{ fontSize: 15 }}>
                                            {item.flagName}
                                        </Typography>
                                        <Typography variant="body2" style={{ fontSize: 12 }}>
                                            {item.flagDescription} Learn more <a href={item.flagInfoUrl}>here</a>.
                                        </Typography>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                }

                <div className="input-group">
                    <InputBase
                        placeholder="Type a Woke Message"
                        className="form-control no-focus"
                        style={{ paddingLeft: "20px", marginTop: 5 }}
                        required
                        value={this.state.text}
                        onKeyUp={this.onKeyUp}
                        onChange={(e, t) => {
                            this.setState({ text: e.target.value });
                        }}
                    />
                    <span className="input-group-btn">
                        <IconButton
                            color="primary"
                            style={{ padding: 10 }}
                            onClick={this.createNewMessage}
                        >
                            <SendIcon />
                        </IconButton>
                    </span>
                </div>
            </div >
        );
    }

    createNewMessage = async () => {
        const username = this.context.attributes.email;
        const members = this.props.conversation.members

        const myInit = {
            body: {
                sentence: this.state.text
            }
        };

        const flags = await API.post('scanmessageapi', '/scanmessage', myInit)

        if (flags.length > 0) {
            const flagsWithoutWarnings = flags.filter(obj => {
                return obj.flagName !== 'Pronoun';
            });

            if (flagsWithoutWarnings.length == 0) {
                this.setState({ openWarning: true })
            }

            else {
                this.setState({ openError: true, errorData: flags })
                return;
            }
        }

        await createMessage({
            content: this.state.text,
            authorId: username,
            recieverId: username,
            messageConversationId: this.props.conversation.id
        });
        this.setState({ text: '', errorData: null });
    }

    onKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.createNewMessage()
        }
    }
}

export default ChatInput;
