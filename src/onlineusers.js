import React from 'react';
import {onlineUsers} from './actions';
import {connect} from 'react-redux';
import OnlineUser from './onlineuser';


export class OnlineUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    render() {
        const {onlineUsers} = this.props;
        let allOnlineUsers;

        allOnlineUsers = (
            <div className = "allOnlineUsers">
                {onlineUsers && onlineUsers.map(onlineUser =>
                    <div className="onlineusersborder" key={onlineUser.id}>
                        <OnlineUser onlineUser={onlineUser} />
                    </div>

                )}
            </div>
        )
        return(
            <div>
                <h1>Online Users</h1>
                {allOnlineUsers}
            </div>

        )
    }
}

const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
}
export default connect(mapStateToProps)(OnlineUsers)
