export default function (state = {}, action) {
    if (action.type =='RECEIVE_FRIENDS') {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    if (action.type =='UPDATE_FRIENDS_LIST') {

        state = Object.assign({}, state, {
            friends: state.friends.map(function(friend) {
                if (friend.id != action.id) {
                    return friend;
                }else {
                    return Object.assign({}, friend, {
                        status: action.friendStatusCode
                    });
                }

            })
        });
    }
    if(action.type =='UPDATE_ONLINE_USERS') {
        state = Object.assign({}, state, {
            onlineUsers: action.onlineUsers
        });
    }
    if(action.type == 'USER_JOINED') {
        state= Object.assign({}, state, {
            onlineUsers: [...state.onlineUsers, action.user]
        });
    }

    if(action.type == 'USER_LEFT') {

        state = Object.assign({}, state, {
            onlineUsers: state.onlineUsers.filter(user => user.id !== action.user.userId)

        });
    }
    if (action.type == 'SEND_CHAT_MESSAGES') {
        state = Object.assign({}, state, {
            allMessages: action.sendMessages
        });

    }

    if(action.type == 'ADD_CHAT_MESSAGE') {

        state = Object.assign({}, state, {
            allMessages: [...state.allMessages, action.userMessage]
        });
    }


    return state;
}

// [...state.onlineUsers,  action.user]
// state.onlineUsers.concat(action.user)

// const count = onlineUsers.filter(user => user.userId == userId).length;




// return(...state, friends: state.friends.map(friend))

    // if (true) {
    //     return (... friend, status: action newStat)
    // }
