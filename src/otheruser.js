import React from 'react';
import axios from './axios';
import {ProfilePicDisplay} from './profilepicdisplay'

export class OtherUser extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            image: '',
            user: '',
            bio: '',
            friendStatusCode: '',
            friendButtonMessage: '',
            sender: ''
        };
        this.friendRequest = this.friendRequest.bind(this);
        this.rejectFriendship = this.rejectFriendship.bind(this);
    }
    componentDidMount() {
        console.log("____________________________", this.props.match);
        console.log("Other users profile, id:", this.props.match.params.id);
        //Make an axios request to get user data and friendship status
        axios.get('/get-userdata/' + this.props.match.params.id)
            .then((result) => {
                //If user is looking at own page redirect to profile
                if (result.data.ownProfile) {
                    this.props.history.push('/');
                } else {
                    var {bio, first, last, image, friends} = result.data;
                    var user = {first, last}
                    //Update page with profile data
                    this.setState({user: user, image: image, bio: bio});

                    //If a friend interaction has been made, update...
                    if (friends.status == 1) {
                        this.setState({friendStatusCode: friends.status})
                        if (friends.sender) {
                            this.setState({friendButtonMessage: 'Cancel Friend Request', sender: true})
                        } else {
                            this.setState({ friendButtonMessage: 'Accept Friend Request', sender: false})
                        }
                    } else if (friends.status == 2) {
                        this.setState({friendButtonMessage: 'End Friendship?', friendStatusCode: friends.status})
                    } else if (friends.status == 3) {
                        const terminationCode = 5;
                        this.setState({
                            friendStatusCode: terminationCode,
                            friendButtonMessage: 'Add Friend'
                        })
                    }else if (friends.status == 4) {
                        this.setState({
                            friendStatusCode: friends.status,
                            friendButtonMessage: 'Add Friend'
                        })
                    } else if (friends.status == 5) {
                        this.setState({friendStatusCode: friends.status, friendButtonMessage: 'Add Friend'})
                        ///Make a state when friendship is true ir not
                    }

                }
            })
            .catch(() => {
                console.log("no response :()");
            })
    }
    friendRequest() {
        axios.post('/make-friend-request', {
            id: this.props.match.params.id,
            friendStatusCode: this.state.friendStatusCode,
            sender: this.state.sender
                })
            .then((result) => {
                var friendStatusCode = result.data.friendStatusCode;
                if(friendStatusCode == 1) {
                        this.setState({ friendStatusCode: friendStatusCode, friendButtonMessage: 'Cancel Friend Request?', sender: true});
                } else if(friendStatusCode == 2) {
                    this.setState({
                            friendStatusCode: friendStatusCode, friendButtonMessage: 'End Friendship', sender: ''
                    })
                }  else if(friendStatusCode ==4) {
                    this.setState ({
                        friendStatusCode: friendStatusCode, friendButtonMessage: 'Add Friend'
                    })
                } else if (friendStatusCode == 5) {
                    this.setState({
                        friendStatusCode: friendStatusCode, friendButtonMessage: 'Add Friend'
                    })
                }else {
                    this.setState({
                        friendStatusCode: '', friendButtonMessage: ''
                    })
                }

            })
    }
    rejectFriendship() {
        const rejectionStatusCode = 3;
        axios.post('/make-friend-request', {
            id: this.props.match.params.id,
            friendStatusCode: rejectionStatusCode,
            sender: this.state.sender
                })
            .then((result) => {
                    this.setState({
                        friendStatusCode: 5, friendButtonMessage: 'Add Friend', sender: ''
                    })
            })
    }

    render() {
        return(
            <div>
                {this.state.image == "https://s3.amazonaws.com/spicedling/jayden/null" &&
                    <img src='/images/unknownprofile.svg'  className="profilepic other" alt={this.state.user.first + ' ' + this.state.user.last} />
                }
                {this.state.image != "https://s3.amazonaws.com/spicedling/jayden/null" &&
                    <img src={this.state.image}  className="profilepic other" alt={this.state.user.first + ' ' + this.state.user.last} />
                }


                {!this.state.friendStatusCode && <button id="otherprofilebutton" type="button" onClick={this.friendRequest}>Add Friend</button>}

                {this.state.sender === false && <button id="otherprofilebutton" type="button" onClick={this.rejectFriendship}>Reject Friend Request</button>}


                {this.state.friendStatusCode && <button type="button" id="otherprofilebutton" onClick={this.friendRequest}>{this.state.friendButtonMessage}</button>}
                {this.state.bio &&
                    <p id="otheruserbio">{this.state.bio}</p>
                }

          </div>
        )
    }
}

// {this.state.sender === false && <button type="button" onClick={this.state.friendStatusCode = 3 && this.friendRequest}>Reject Friend Request</button>}
