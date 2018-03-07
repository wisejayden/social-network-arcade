import React from 'react';
import axios from './axios';

export class MessageUploader extends React.Component {
    constructor(props) {
        super(props)
        this.state={};
        this.setFieldValue = this.setFieldValue.bind(this);
        this.uploadProfileMessage = this.uploadProfileMessage.bind(this);
        this.uploadProfileMessageButton = this.uploadProfileMessageButton.bind(this);


    }
    setFieldValue(e) {
        this[e.target.name] = e.target.value
    }
    uploadProfileMessage(e) {
        if(e.keyCode == 13) {
            axios.post('/profile-edit', {
                id: this.props.user.id,
                message: this.message
            })
            .then((res) => {
                this.props.updateBio(res.data.message);
                this.props.updateProfile();
                this.props.showBioFn();

            })
        }
    }
    uploadProfileMessageButton() {
            axios.post('/profile-edit', {
                id: this.props.user.id,
                message: this.message
            })
            .then((res) => {
                this.props.updateBio(res.data.message);
                this.props.updateProfile();
                this.props.showBioFn();

            })
    }
    render(){
        return(
            <div>
                <textarea ref={(input) => { this.textInput = input; }} id="msg" name="message" onChange={this.setFieldValue} onKeyDown={this.uploadProfileMessage}>{this.props.message}</textarea>
                <button id="message-submit" type="button" onClick={this.uploadProfileMessageButton}>Submit</button>
                <button id="message-cancel" type="button" onClick={this.props.cancelUpdateMessage}>Cancel</button>
            </div>
        )
    }
}
