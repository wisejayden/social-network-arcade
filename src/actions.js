import axios from './axios';

export function receiveFriends() {
    return axios.get('/get-friends').then(function({ data }) {
        return {
            type: 'RECEIVE_FRIENDS',
            friends: data.users
        };
    });
}

export function friendsListButtonClick(theirId, friendStatusCode) {
    return axios.post('/make-friend-request', {
        id: theirId,
        friendStatusCode
    })
        .then(({data}) => {
            //get users again
            return {
                type: 'UPDATE_FRIENDS_LIST',
                id: theirId,
                friendStatusCode: data.friendStatusCode
            };
        });
}

export function onlineUsers(onlineUsers) {
    return {
        type: 'UPDATE_ONLINE_USERS',
        onlineUsers: onlineUsers
    };
}

export function addUser(user) {
    return{
        type: 'USER_JOINED',
        user: user
    };
}

export function removeUser(user) {
    return {
        type: 'USER_LEFT',
        user
    };
}

export function sendChatMessages (allMessages) {

    return {
        type: "SEND_CHAT_MESSAGES",
        sendMessages: allMessages
    };
}

export function addChatMessage(userMessage) {
    return{
        type: "ADD_CHAT_MESSAGE",
        userMessage
    };
}
