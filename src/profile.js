import React from 'react';
import {ProfilePicEdit} from './profilepicedit';
import {MessageUploader} from './messageuploader';
import {Uploader} from './uploader';
import {ChangeBackground} from './changebackground';
import { Link, BrowserRouter, Route } from 'react-router-dom';


export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            updateProfileBioSubmit: false,
            profileButton: true,
            imageStyle: 'profileimage',
            showBio: true
        };
        this.editProfile = this.editProfile.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.showBioFn = this.showBioFn.bind(this);
        this.cancelUpdateMessage = this.cancelUpdateMessage.bind(this);
    }

    editProfile() {
        this.setState({ updateProfileBioSubmit: true })
        this.setState({ profileButton: false, showBio: false })
    }
    updateProfile() {
        this.setState({profileButton : true, updateProfileBioSubmit:false});

    }
    showBioFn() {
        this.setState({
            showBio: true
        })
    }
    cancelUpdateMessage() {
        this.setState({
            updateProfileBioSubmit: false,
            showBio: true
        })
    }
    componentDidMount() {
        var self = this;
        window.addEventListener("keydown", function(e) {
            if(e.key == "Escape") {
                self.cancelUpdateMessage();
            }
        })

    }


    render() {
        return(
            <div>
                <h1>{this.props.user.first + ' ' + this.props.user.last}</h1>
                <div id="largeprofileimage">
                    <ProfilePicEdit className = 'profileimage' image = {this.props.image} showUploader={this.props.showUploader}  user={this.props.user}/>
                </div>

                    {!this.props.bio && this.state.profileButton &&
                        <button id="edit-profile-button" name="button" onClick={this.editProfile}>Add Profile</button>
                    }

                    {this.state.showBio && this.props.bio &&
                        <div>
                            <div className="bio" onClick={this.editProfile}>
                            {this.props.bio && <p>{this.props.bio}</p>}
                            </div>
                        </div>
                    }

                        {this.state.updateProfileBioSubmit &&
                        <MessageUploader updateBio={this.props.updateBio} image= {this.props.image} user={this.props.user} updateProfile={this.updateProfile} message={this.props.bio} showBioFn={this.showBioFn} cancelUpdateMessage={this.cancelUpdateMessage}/>
                        }
            </div>
        )
    }

}
