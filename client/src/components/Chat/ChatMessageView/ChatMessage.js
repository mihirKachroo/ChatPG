import React, { Component } from 'react';

/**
 * Chat message component to render conversation
 */

class ChatMessage extends Component {
    render() {
        const createdAtDate = this.props.message.createdAt
            ? new Date(this.props.message.createdAt).toDateString()
            : new Date().toDateString();
        var todayDate = new Date().toDateString();

        const timeString =
            todayDate == createdAtDate
                ? new Date(this.props.message.createdAt).toLocaleTimeString([], {
                    timeStyle: "short",
                })
                : new Date(this.props.message.createdAt).toLocaleTimeString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });

        return (
            <div className={this.messageClassNames()}>
                <div className="card-body p-2 border rounded">
                    <div className='clearfix'>
                        <h6 className={this.cardTitleClassNames()}>
                            {this.props.message.authorId}
                        </h6>
                        <div className='float-right'>
                            <small className="card-subtitle mb-0 text-muted">{timeString}</small>
                            &nbsp;
                            <i className={this.checkmarkClassNames()} data-pack="default" data-tags="talk"></i>
                        </div>
                    </div>
                    <p className="card-text mb-0">{this.props.message.content}</p>
                </div>
            </div>
        );
    }

    messageClassNames = () => {
        let classes = "card w-75 mb-2 chat-message";
        if (this.props.isFromMe) {
            classes += " float-right border-primary"
        } else {
            classes += " border-neutral"
        }
        return classes;
    }

    cardTitleClassNames = () => {
        let classes = "card-title mb-1 float-left";
        if (this.props.isFromMe) {
            classes += " text-primary"
        } else {
            classes += " text-neutral"
        }
        return classes;
    }

    checkmarkClassNames = () => {
        // [class.text-muted]="!message.isSent" [class.text-info]="message.isSent"
        return "ion-checkmark text-info"
    }
}

export default ChatMessage;
