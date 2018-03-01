var spicedPg = require('spiced-pg');
var db = spicedPg(process.env.DATABASE_URL || 'postgres:dbadmin:spiced@localhost:5432/socialnetwork');

module.exports.newUser = function(first, last, email, password) {
    return db
        .query(
            `INSERT INTO users (first, last, email, hash_pass, profile_image, bio, background) VALUES ($1, $2, $3, $4, $5, $6, $7) returning id`,
            [first || null, last || null, email || null, password || null, null, null, '/images/rainfall.gif']
        )
        .then((results) => {
            console.log("Working?");
            return results.rows;
        })
        .catch((err) => {
            console.log('Not working');
            return err;
        });
};

module.exports.checkLogin = function(email) {
    return db
        .query(
            `SELECT * FROM users WHERE (email) = ($1)`,
            [email]
        )
        .then((results) => {
            return results;
        })
        .catch(() => {
            console.log("Checklogin database error");
        });
};

module.exports.updateProfileImage = function(filename, id) {
    return db
        .query(
            `UPDATE users SET profile_image = $1 WHERE id = ($2)`,
            [filename, id]
        )
        .then((results) => {
            return results;
        })
        .catch(() => {
            console.log("updateProfileImage catch");
        });
};

module.exports.updateProfileMessage = function(message, id) {
    return db
        .query(
            `UPDATE users SET bio = $1 WHERE id = ($2)`,
            [message, id]
        )
        .then((results) => {
            return results;
        })
        .catch(() => {
            console.log("updateProfileMessage catch");
        });
};

module.exports.getUserData = function (id) {
    return db
        .query(
            `SELECT * FROM users WHERE id = ($1)`,
            [id]
        )
        .then((results)=> {
            return results;
        })
        .catch(() => {
            console.log("getUserData catch");
        });
};

module.exports.makeFriendRequest = function (myId, theirId) {
    return db
        .query (
            `INSERT into friend_requests (sender_id, recipient_id, status) VALUES ($1, $2, $3)`,
            [myId, theirId, 1]
        )
        .then(() => {
            console.log("successsful insertion friend request");
        })
        .catch(() => {
            console.log("Friend request not successful");
        });
};


module.exports.getFriendRequestData = function (myId, theirId) {
    return db
        .query (
            `SELECT * FROM friend_requests
            WHERE (recipient_id = $1 AND sender_id = $2)
            OR (recipient_id = $2 and sender_id = $1)`,
            [myId, theirId]
        )
        .then((results) => {
            return results;
        });
};

module.exports.updateFriendRequestData = function (friendsStatus, myId, theirId) {
    return db
        .query(
            `UPDATE friend_requests SET status = ($1)
            WHERE recipient_id = ($2) AND sender_id = ($3)
            OR sender_id =($2) AND recipient_id =($3)`,
            [friendsStatus, myId, theirId]
        )
        .then(() => {
            console.log("UPdated friends table");
        });
};

module.exports.cancelFriendRequest = function (myId, theirId) {
    return db
        .query(
            `DELETE FROM friend_requests
            WHERE sender_id = ($1) AND recipient_id = ($2)`,
            [myId, theirId]
        )
        .then(() => {
            console.log("Successfully cancelled");
        });
};

module.exports.getFriends = function (myId) {
    const PENDING = 1, ACCEPTED = 2;

    return db
        .query(
            `SELECT users.id, first, last, profile_image, status
            FROM friend_requests
            JOIN users
            ON (status = ${PENDING} AND recipient_id = $1 AND sender_id = users.id)
            OR (status = ${ACCEPTED} AND recipient_id = $1 AND sender_id = users.id)
            OR (status = ${ACCEPTED} AND sender_id = $1 AND recipient_id = users.id)`,
            [myId]
        )
        .then((results) => {
            return results.rows;
        })
        .catch(() => {
            console.log("Error with getfriends query");
        });
};

module.exports.getUsersByIds = function(arrayOfIds) {
    return db
        .query(
            `SELECT first, last, profile_image, id FROM users WHERE id = ANY($1)`,
            [arrayOfIds]
        )
        .then((results) => {
            return results.rows;
        })
        .catch(() => {
            console.log("getUserByIds catch");
        });
};

module.exports.updateBackgroundImage = function(image, id) {
    return db
        .query(
            `UPDATE users SET background = $1 WHERE id = ($2)`,
            [image, id]
        )
        .then((results) => {
            console.log("log updateBackgroundImage results", results.rows);
            return results.rows;
        })
        .catch(() => {
            console.log("updateBackgroundImage user query function catch");
        });
};



// `SELECT * FROM friends_requests
// WHERE recipient_id = ($1) OR sender_id($1)
// AND `
