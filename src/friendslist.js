import React from 'react';
import { receiveFriends, friendsListButtonClick } from './actions';
import {connect} from 'react-redux';
import Friend from './friend';
import Wannabe from './wannabe'

export class FriendsList extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showFriends: true,
            showWannabes: false
        };
        this.checkForStatus = this.checkForStatus.bind(this);
        this.friendsOrPendingButton = this.friendsOrPendingButton.bind(this);

    };
    checkForStatus(status) {
        if (status == 1) {
            status = "Cancel Friend Request"
        } else {
            status = "End Friendship"
        }
    }
    friendsOrPendingButton() {
        if (this.state.showFriends == true) {
            this.setState({
                showFriends: false,
                showWannabes: true
            })
        } else {
            this.setState({
                showFriends: true,
                showWannabes: false
            })
        }
    }


    componentDidMount() {
        this.props.dispatch(receiveFriends());
    }

    render() {

        const friends = this.props.friends;
        const {wannabes} = this.props;
        let allFriends;
        let allWannabes;



        allFriends = (
            <div className = "allfriends">
                {friends && friends.map(friend =>
                    <div className="friendscontainer" key={friend.id}>
                        <Friend friend={friend}  />
                        <button className="friendshipbutton" name="button" onClick={() => this.props.dispatch(friendsListButtonClick(friend.id, friend.status))}>End Friendship</button>
                    </div>
                )}

            </div>
        )
        allWannabes = (
            <div className = "allWannabes">
                {wannabes && wannabes.map(wannabe =>
                    <div className="wannabecontainer"  key ={wannabe.id}>
                        <Wannabe wannabe={wannabe} />
                        <button  className="friendshipbutton" name="button" onClick={() => this.props.dispatch(friendsListButtonClick(wannabe.id, wannabe.status))}>Accept Friendship </button>
                    </div>
                )}
            </div>
        )







        return(
            <div id="friends">

                {this.state.showFriends &&
                    <div>
                        <h1>Friends</h1>

                        <button className="friend-pending-button" onClick={this.friendsOrPendingButton} type="button" >Show Pending Requests..</button>
                    </div>
                }
                {this.state.showFriends && allFriends}


                {this.state.showWannabes &&
                    <div>
                        <h1>Wannabes</h1>

                        <button className="friend-pending-button" onClick={this.friendsOrPendingButton} type="button" > Show Friends</button>
                    </div>
                }
                {this.state.showWannabes && allWannabes}
                {friends && !friends.length && <div id="nofriends">You have no friends!</div>}


            </div>

        )
    }
}


const mapStateToProps = function(state) {
    return {
        friends: state.friends && state.friends.filter(friend => friend.status == 2),
        wannabes: state.friends && state.friends.filter(wannabe => wannabe.status == 1)

    };
};
export default connect(mapStateToProps)(FriendsList)
