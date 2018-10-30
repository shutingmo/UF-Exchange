﻿var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
var User = require('../models/user.server.model.js');
db.bind('users');


var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
    // var deferred = Q.defer();

    // db.users.findOne({ username: username }, function (err, user) {
    //     if (err) deferred.reject(err.name + ': ' + err.message);

    //     // console.log(user.password);
    //     // console.log(user.hash);
    //     if (user && bcrypt.compareSync(password, user.hash)) {
    //         // authentication successful
    //         deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
    //     } else {
    //         // authentication failed
    //         deferred.resolve();
    //     }
    // });

    // return deferred.promise;
    var deferred = Q.defer();

    db.users.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.password)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            // deferred.resolve(_.omit(user, 'hash'));
            deferred.resolve(_.omit(user, 'password'));

        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                // createUser();
                matchPasswords();
            }
        });

    function matchPasswords() {
        console.log('the password is ' + userParam.password);
        console.log('retyped is ' + userParam.retypePassword);
    
        if(userParam.password === userParam.retypePassword)
        {
            createUser();
        }
        else
        {
            deferred.reject('Passwords do not match');
        }
    }

    function createUser() {
        var newUser = _.omit(userParam, 'retypePassword');

        // add hashed password to user object
        // newUser.hash = bcrypt.hashSync(userParam.password, 10);
        newUser.password = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            newUser,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }
    

    return deferred.promise;
}



function update(_id, userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.username !== userParam.username) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { username: userParam.username },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // username already exists
                        deferred.reject('Username "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            name: userParam.name,
            username: userParam.username,
            email: userParam.email,

            //delete this later
            // password: userParam.password
        };

        // update password if it was entered
        if (userParam.password) {
            // set.hash = bcrypt.hashSync(userParam.password, 10);

            set.password = bcrypt.hashSync(userParam.password, 10);

        }

        db.users.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}