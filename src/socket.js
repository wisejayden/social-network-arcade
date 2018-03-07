import * as io from 'socket.io-client';
import {store} from './start';
import {onlineUsers, addUser, removeUser, addChatMessage, sendChatMessages} from './actions';


let socket;

export function initSocket() {
    if(!socket) {
        socket = io.connect();
        socket.on('onlineUsers', (results) => {
            store.dispatch(onlineUsers(results.results));
        });

        socket.on('userJoined', (user) => {
            store.dispatch(addUser(user));
        });

        socket.on('userLeft', (user) => {
            store.dispatch(removeUser(user));
        });
        socket.on('sendChat', (sendMessages) => {
            store.dispatch(sendChatMessages(sendMessages));
        });
        socket.on('chat', (userMessage) => {
            store.dispatch(addChatMessage(userMessage));
        });
    }
}

export function emitChatMessage(message) {
    socket.emit('chatMessage', message);
}
