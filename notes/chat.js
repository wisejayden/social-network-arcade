//Persisting data.
//actions must be objects
//Action creators create objects that make actions



//inside socket
//Open connection between the client and the server


When hitting the enter key, calls a function(in socket.js) that emits a chat message.
Emits it from the client side, sends along the message text. Listens for that message on the server.
Creates an empty object and then push it to an array of messages. increment msg id. Then broadcast.
Action, reducer then mapStateToProps inside client.

function emitChatMessage(m) {
    socket.emit('chat', m)
}


//inside initSocket(store)
//import actions
socket.on('chat', singleChatMessag) => {
    store.dispatch(chatMessage(singleChatMessage))
}


//actions
function thisIsTheCreator() {

    return {    (the action)
        type: "THIS_IS_AN_ACTION_CREATOR",
        payload: blah
    }
}

//Reducer
reducer(state = {}, action) //Comes from the store!
    chatMessage: [...state.chatMessage, action.singleChatMessag]






//Inside server
let id = 0;
socket.on('chatMessage', msg => {
    //save messages to array
    socket.emit('') send all messages, runs on connection so it appears immediately

    const singleChatMessage = {

    }
    mesages.push({
    })
    id++;
})

//broadcast
io.sockets.emit('chat', singleChatMessage)



//inside Chat class
//Import emitChatMessage

obKeyDown(e) {
    if (e.keyCode == 13) {
        let msg = e.target.value;
        e.target.value = '';
        //Dispatch msg
        emitChatMessage(msg)

        e.preventDDefault();
    }
}
renderChats() {


    this.props.chatMessages.map(singleMsg => {
        return (
            <p key={singleMsg.id}>{singleMsg.messageText}</p>
        )
    })
}

if(!this.props.chatMessage) {
    return (<p>Loading....</p>)
}

<textarea onKeyDown={(e)}</textarea>

{this.renderChats()}



mapStateToProps(state) {
    return {
        chatMessage: state.chatMessages
    }
}

export default connect(mapStateToProps, mapDisptatchToProps(????))(chat)
