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
        console.log("Hitting online users reducer");
        state = Object.assign({}, state, {
            onlineUsers: action.onlineUsers
        });
        console.log("log the state", state);
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
        console.log("reduce send chat");
        state = Object.assign({}, state, {
            allMessages: action.sendMessages
        });
        console.log('send chat message reducer', state);

    }

    if(action.type == 'ADD_CHAT_MESSAGE') {
        console.log("Inside chat message reducer - add chat message", action.userMessage);

        state = Object.assign({}, state, {
            allMessages: [...state.allMessages, action.userMessage]
        });
        console.log('add chat message reducer', state);
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
