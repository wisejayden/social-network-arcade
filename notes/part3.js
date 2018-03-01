//WebSocket

In your server create an array with lots of objects containing id with socket ids.
Or keys are the socket id and the values are the ids.
Every time log in, add the id,
when a disconnect prune out.
Only when theres no id related to a socket to log out.

1.onlineUsers
    Only fire it to one user.
2.userJoined
    Goes to everyone BUT the user. - broadcast
3.userLeft
     - Emitted to all sockets

Emit an event, only to me a list of all onlineUsers. Keep that list in redux.
Dispatch an action to put the list in store.
Every time a user joined  - 2. event. Add to users.
send the list to me, and then send to everyone else a userJoined.
Every time a socket disconnetcs, remove the socket fro list. Check to see if the user.

onlineUsers.push({
    userId: userId,
    socketId: socket.id
})

if userJoins but already signed in, add to list, but no need to broadcast



Client size
Call dispatch and redux actions.
export the store - (const store)
create socket.js, import store.
import * as io from 'socket.io-client';
import _____ from '.actions'

//one variable named socket
let socket;

export function init() {
    if(!socket) {
        socket = io.connect();

        socket.on('onlineUser', () => {
            store.dispatch(onlineUsers(users))
        };

        socket.on('userJoined', () => {});
        socket.on('userLeft', () => {});
    }
}

if (action.type =='USER_JOINED') {
    state=Object.assign({}, state, {
        onlineUsers: []
    })
}




//Redux
function reducer(state = {}, action) {
    if (action.type == 'SHOW_BIO_UPDATER') {
        return { ...state, bioEditorIsVisible: true};
    }
    if (action.type == 'UPDATE_BIO') {
        // const user = { ...state.user, bio: action.bio };
        // return{ ...state, user }
        return { ...state, user: { ...state.user, bio:action.bio}}
    }
    return state;
}



//Part 6
id
recipient_id
sender_id
status

5 Status

1. pending
2. accepted
3. rejected
4. cancelld
5. terminated

check if accepted or pending

query
`SELECT & FROM friend_requests
    WHERE (recipient_id = $1 AND sender_id)
    OR (recipient_id = $1 AND sender_id)
    AND statis = `

//Day 5
middleware
function requireUser (req, res, next) {
    if (!req.session.user) {
        res.sendStatus(403)
    } else {
        next();
    }
}

app.get('/user/:id/info')
different route in ajax then what is in server



//Day 4

<BrowserRouter>
    <div>
        <Route = exact path="/friends" component={} />
    </div>
<BrowserRouter />


///// App.get('/friends.json') Use a different name for your server or api for all axios request

history.pushState({ funky: 'chicken' }, 'funky chicken', '/disco/duck')
history.pushState({}, 'funky chicken', '/disco/turkey')
addEventListener('popstate', function(e) {
    console.log(e.state);
})


Must use Link component
















//Day 3

App js is main file, first thing it should do is make an ajax request to find all info about user.

constructor() {

}
componentDidMount() { //lifecycle function

}


therw will be a bio table
<ProfilePic image = {this.state.image} showUPloader={showUPloader}/>
<this.state.uploaderSHouldBeVisible && <Uploader setImage ={setImage(img)}/>}


function profilePic(props) {
    if (!props.image) {
        return null;
    }
    return <img onClick={this.props.showUploader} src={props.image} alt={props.first + '' + props.last}
}

<label htmlFor="myinput"></label>
app - ajax request
uploader component - function for setting apps state image property
profile pic - change the state of app, but is passed a function from app
