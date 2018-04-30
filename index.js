const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const https = require('https');
const middleware = require('./middleware.js');
const userQueries = require('./models/users.js');
const csurf = require('csurf');
const multer = require('multer')
const uidSafe = require('uid-safe');
const path = require('path');
const config = require('./config')
const hostWebsite = config.s3Url;
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { getSessionFromSocket } = require('socket-cookie-session');
const secrets = require('./secrets.json');
const backgrounds = require('./backgrounds.json');

//Middleware functions
var hashPassword = middleware.hashPassword;
var checkPassword = middleware.checkPassword;
var uploadToS3 = middleware.uploadToS3;

//Database queries
var newUser = userQueries.newUser;
var checkLogin = userQueries.checkLogin;
var updateProfileImage = userQueries.updateProfileImage;
var updateProfileMessage = userQueries.updateProfileMessage;
var getUserData = userQueries.getUserData;
var getFriendRequestData = userQueries.getFriendRequestData;
var makeFriendRequest = userQueries.makeFriendRequest;
var updateFriendRequestData = userQueries.updateFriendRequestData;
var cancelFriendRequest = userQueries.cancelFriendRequest;
var getFriends = userQueries.getFriends;
var getUsersByIds = userQueries.getUsersByIds
var updateBackgroundImage = userQueries.updateBackgroundImage;




app.use(compression());
app.use(express.static(__dirname + '/public'));
app.use(cookieSession({
    secret: process.env.SESSION_SECRET || secrets.secret,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie('mytoken', req.csrfToken());
    next();
});
app.set('port', (process.env.Port || 8080));


app.use(bodyParser.json());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}


//For uploading images
var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});



//To get and update the "Theme" of the social media.
app.get('/get-background-images', function(req, res) {
    res.json({
        success: true,
        backgrounds
    });
});
app.post('/update-background-image', function(req, res) {
    updateBackgroundImage(req.body.image, req.session.user.id)
        .then(()=> {
            res.json({
                success: true
            });
        });
});




app.post('/register', function(req, res) {
    var { first, last, email, password} = req.body;
    hashPassword(password)
        .then((hashedPassword) => {
            newUser(first, last, email, hashedPassword)
                .then((results) => {
                    if(results.code) {
                        //23502 code == 'Incomplete details'
                        if(results.code == 23502) {
                            res.json({
                                success: false,
                                incompleteDetails: true
                            });
                            //23505 code == 'Not a unique email'
                        } else if (results.code == 23505) {
                            res.json({
                                success: false,
                                notUniqueEmail: true
                            });
                        }
                        //Successful registration, assign cookie and respond with success
                    } else {
                        req.session.user = {
                            first_name: first,
                            last_name: last,
                            email: email,
                            id: results[0].id,
                            profileImage: ''

                        };
                        res.json({
                            success: true
                        });
                    }
                });
        })
        .catch(() => {
            res.json({
                success: false,
                incompletePassword: true
            });
        });

});



app.post('/login', function(req, res) {
    var { email, password} = req.body;
    checkLogin(email)
        .then((results) => {
            checkPassword(password, results.rows[0].hash_pass)
                .then((doesMatch) => {
                    if (doesMatch) {
                        var profileImage = results.rows[0].profile_image;
                        req.session.user = {
                            first_name: results.rows[0].first,
                            last_name: results.rows[0].last,
                            email: results.rows[0].email,
                            id: results.rows[0].id,
                        };
                        if (profileImage) {
                            req.session.user.profileImage = profileImage;
                        }
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false,
                            reason: 'Password incorrect'
                        });
                    }
                })
                .catch(() => {
                    res.json({
                        success: false,
                        reason: 'No password'
                    });
                });
        })
        .catch(() => {
            res.json({
                success: false,
                reason: 'Wrong email'
            });
        });
});


app.get('/hello', function(req, res) {
    if(req.session.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/welcome', function(req, res) {
    if(req.session.user) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/user', function(req, res) {
    getUserData(req.session.user.id)
        .then((results) => {
            var {first, last, email, id, profile_image, bio, background} = results.rows[0];
            if(profile_image) {
                profile_image = hostWebsite + profile_image;
            }
            res.json({
                first: first,
                last: last,
                email: email,
                id: id,
                profileImage: profile_image,
                message: bio,
                background
            });
        });

});

app.get('/get-friends', function(req, res) {
    getFriends(req.session.user.id)
        .then((results) => {
            for (var i = 0; i < results.length; i++) {
                results[i].profile_image = hostWebsite + results[i].profile_image;
            }
            res.json({
                users: results
            });
        });
});

app.get('/get-userdata/:id', function(req, res) {
    if (req.session.user.id == req.params.id) {
        res.json({
            ownProfile: true
        });
    }else {
        getUserData(req.params.id)
            .then((results) => {
                var {first, last, profile_image, bio} = results.rows[0];
                getFriendRequestData(req.session.user.id, req.params.id)
                    .then((results) => {
                        var friendResults;
                        if(!results.rows[0]) {
                            friendResults = false;
                        } else {
                            var {recipient_id, sender_id, status} = results.rows[0];
                            friendResults= {
                                recipient_id,
                                sender_id,
                                status
                            };
                            if (sender_id == req.session.user.id) {
                                friendResults.sender = true;
                            } else {
                                friendResults.sender = false;
                            }
                        }
                        res.json({
                            success: true,
                            first: first,
                            last: last,
                            image: hostWebsite + profile_image,
                            bio: bio,
                            friends: friendResults
                        });
                    });
            });
    }
});

app.post('/make-friend-request', function(req, res) {
    var myId = req.session.user.id;
    var theirId = req.body.id;
    var friendRequest = req.body.friendStatusCode;
    if (!friendRequest) {
        makeFriendRequest(myId, theirId)
            .then(() => {
                res.json({
                    success: true,
                    friendStatusCode: 1
                });
            });
    } else if (friendRequest == 1) {
        if(req.body.sender) {
            friendRequest = 4;
            updateFriendRequestData(friendRequest, myId, theirId)
                .then(() => {
                    res.json({
                        success: true,
                        friendStatusCode: friendRequest,
                        theirId
                    });
                });
        } else {
            friendRequest = 2;
            updateFriendRequestData(friendRequest, myId, theirId)
                .then(() => {
                    res.json({
                        success: true,
                        friendStatusCode: friendRequest,
                        theirId
                    });
                });

        }

    } else if (friendRequest == 2) {
        friendRequest = 5;
        updateFriendRequestData(friendRequest, myId, theirId)
            .then(() => {
                res.json({
                    success: true,
                    friendStatusCode: friendRequest
                });
            });
    } else if (friendRequest == 3) {
        updateFriendRequestData(friendRequest, myId, theirId)
            .then(() => {
                res.json({
                    success: true,
                    friendStatusCode: friendRequest
                });
            });
    } else if(friendRequest == 4) {
        friendRequest = 1;
        updateFriendRequestData(friendRequest, myId, theirId)
            .then(() => {
                res.json({
                    success: true,
                    friendStatusCode: friendRequest
                });
            });
    }else if(friendRequest == 5) {
        friendRequest = 1;
        updateFriendRequestData(friendRequest, myId, theirId)
            .then(() => {
                res.json({
                    success: true,
                    friendStatusCode: friendRequest
                });
            });
    }
});

app.post('/upload-image', uploader.single('file'), uploadToS3, function(req, res) {
    if (req.file) {
        updateProfileImage(req.file.filename, req.body.id)
            .then(() => {
                req.session.user.profileImage = req.file.filename;
                res.json({
                    success: true,
                    file_url: hostWebsite + req.file.filename,
                    id: req.body.id
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({
            success: false
        });
    }
});


app.post('/profile-edit', function(req, res) {
    updateProfileMessage(req.body.message, req.body.id)
        .then(() => {
            req.session.message = req.body.message;
            res.json({
                success: true,
                message: req.body.message,
                id: req.body.id
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
});



app.get('*', function(req, res) {
    if(!req.session.user) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


// 
// server.listen(process.env.PORT || 8080, function() {
//     console.log("I'm listening.");
// });

app.listen(process.env.PORT || app.get('port'), () => console.log("Listening on port 8080"));


const onlineUsers = [];
const allMessages = [];
let messageId = 0;


//Web socket
io.on('connection', function(socket) {
    const session = getSessionFromSocket(socket, {
        secret: process.env.SESSION_SECRET || secrets.secret,
    });
    //Disconnect socket is user logs out
    if (!session || !session.user) {
        return socket.disconnect(true);
    }
    const userId = session.user.id;
    onlineUsers.push({
        userId: userId,
        socketId: socket.id
    });
    //Database query to find all users, looping through to attach profile pictures.
    getUsersByIds(onlineUsers.map(user => user.userId))
        .then((results) => {
            for (var i = 0; i < results.length; i++) {
                results[i].profile_image = hostWebsite + results[i].profile_image;
            }
            //Send all online users and chat messages to newly logged in user.
            socket.emit('onlineUsers', {
                results
            });
            socket.emit('sendChat', allMessages);
            //If user is the only logged in persona, broadcast to every other user that they have arrived.
            const count = onlineUsers.filter(user => user.userId == userId).length;
            if (count === 1) {
                getUserData(session.user.id)
                    .then((result) => {
                        var {id, first, last, profile_image} = result.rows[0];
                        profile_image = hostWebsite + profile_image;
                        socket.broadcast.emit('userJoined', {
                            id, first, last, profile_image
                        });
                    });
            }
        })
        .catch((err) => {
            console.log(err);
        });
    socket.on('chatMessage', message =>  {
        getUserData(userId)
            .then((results) => {
                var {id, first, last, profile_image} = results.rows[0];
                const singleChatMessage = {
                    messageId,
                    message,
                    user: {
                        id,
                        first,
                        last,
                        profile_image: hostWebsite + profile_image
                    }
                };

                allMessages.push(singleChatMessage);
                messageId++;
                io.sockets.emit('chat', singleChatMessage);
            });
    });
    socket.on('disconnect', function() {
        //loop through online users, find user with correct socket id. Remove, and check if its last socket under their profile.
        for (var i = 0; i < onlineUsers.length; i++) {
            if(onlineUsers[i].socketId == socket.id) {
                onlineUsers.splice(i, 1);
                break;
            }
        }
        var onlineUser = onlineUsers.find(user => user.userId == userId);
        if(!onlineUser) {
            io.sockets.emit('userLeft', {
                userId
            });
        }
    } );
});
