import React from 'react';
import {emitChatMessage} from './socket';
import {connect} from 'react-redux';
import { HashRouter, Route, Link } from 'react-router-dom';


export class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
        this.enterMessage = this.enterMessage.bind(this);
        this.renderChat = this.renderChat.bind(this);
    }
    enterMessage(e) {
        if(e.keyCode == 13) {
            let message = e.target.value;
            e.target.value = '';
            emitChatMessage(message);

            e.preventDefault();
        }
    }
    renderChat() {
        console.log("Inside render chat________________", this.props);
        this.props.chatMessages.map(singleMessage => {
            return (
                <p key={singleMessage.id}>{singleMessage.message}</p>
            )
        })
    }
    componentDidMount() {
        this.chatScroll.scrollTop = this.chatScroll.scrollHeight - this.chatScroll.clientHeight;

    }
    componentDidUpdate() {
        this.chatScroll.scrollTop = this.chatScroll.scrollHeight - this.chatScroll.clientHeight;

    }

    render() {
        const {allMessages} = this.props;
        let chatWindowMessages;
        console.log("Inside render", allMessages);

        chatWindowMessages = (
            <div>
                {allMessages && allMessages.map(singleMessage =>

                        <div key={singleMessage.messageId} className={this.props.user.id == singleMessage.user.id ? 'my-chat-profilediv' : 'their-chat-profilediv'}>

                        {singleMessage.user.profile_image == "https://s3.amazonaws.com/spicedling/jayden/null" &&
                            <Link to={"/user/" + singleMessage.user.id}><img  className={this.props.user.id == singleMessage.user.id ? 'my-chat-profilepic' : 'their-chat-profilepic'} src="/images/unknownprofile.svg" alt={singleMessage.user.first + '' + singleMessage.user.last} /></Link>
                        }
                        {singleMessage.user.profile_image != "https://s3.amazonaws.com/spicedling/jayden/null" &&
                            <Link to={"/user/" + singleMessage.user.id}><img  className={this.props.user.id == singleMessage.user.id ? 'my-chat-profilepic' : 'their-chat-profilepic'} src={singleMessage.user.profile_image} alt={singleMessage.user.first + '' + singleMessage.user.last} /></Link>
                        }

                            <p className={this.props.user.id == singleMessage.user.id ? 'my-chat-profiletext' : 'their-chat-profiletext'}>{singleMessage.message}</p>
                        </div>
                )}
            </div>
        )

        return(
            <div>
                <h1 className="chatheading">Chat</h1>

                <div className="chat-messages" ref={(chatScroll) => { this.chatScroll = chatScroll; }}>
                    <p id="chatwelcome">Welcome to the chat!</p>
                    {chatWindowMessages}
                </div>
                <textarea id="chat-text-area" onKeyDown={this.enterMessage}></textarea>
            </div>

        )
    }
}

const mapStateToProps = function(state) {
    return {
        allMessages: state.allMessages
    }
}
export default connect(mapStateToProps)(Chat)
