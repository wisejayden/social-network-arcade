// Created middleware module.

//If user tries to go to page when they do not have a cookie ,redirect them to the home page.

var bcrypt = require('bcryptjs');
const knox = require('knox');
const fs = require('fs');
let secrets;


module.exports.checkForUser = function (req, res, next) {
    if (req.session.user) {
        console.log("User already logged in");
        res.redirect('/profile');
    } else {
        next();
    }
};

module.exports.checkCookie = function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/register');
    } else {
        next();
    }
};

module.exports.checkProfile = function(req, res, next) {
    if(!req.session.user.profile) {
        res.redirect('/profile');
    } else {
        next();
    }
};
module.exports.checkForSignature = function(req, res, next) {
    if(!req.session.user.hasSigned == true) {
        console.log("You must sign before you can access these pages");
        res.redirect('/petition');
    } else {
        next();
    }
};


module.exports.hashPassword = function (plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};

module.exports.checkPassword = function (textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};






// in production the secrets are environment variables, otherwise stored in json file
if (process.env.NODE_ENV == 'production') {
    secrets = process.env;
} else {
    secrets = require('./secrets');
}

//Connect to Amazon server
const client = knox.createClient({
    key: secrets.awsKey,
    secret: secrets.awsSecret,
    bucket: 'spicedling'
});


// Upload data to website
module.exports.uploadToS3 = function(req, res, next) {
    const s3Request = client.put("/jayden/" + req.file.filename, {
        'Content-Type': req.file.mimetype,
        'Content-Length': req.file.size,
        'x-amz-acl': 'public-read'
    });
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);

    //Next(), on successful response
    s3Request.on('response', s3Response => {
        const wasSuccessful = s3Response.statusCode == 200;
        if (wasSuccessful) {
            console.log("Here is the link - https://s3.amazonaws.com/spicedling/jayden/" + req.file.filename);
            next();
        } else {
            console.log("Middleware Error");
        }
    });
};
