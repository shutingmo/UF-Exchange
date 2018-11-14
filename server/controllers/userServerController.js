var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/userServerModel.js');
var bcrypt = require('bcryptjs');
// var body = require('body-parser');

// exports.getAllUsers = function(req, res){
//     User.find({}).then(function (err, users) {
//         if(err)
//         {
//             console.log(err)
//             return;
//         }
//         res.json(users);
//     });
// };

exports.authenticateUser = function(req, res){
    console.log('the username is ' + JSON.stringify(req.body.username));
    console.log('the password is ' + JSON.stringify(req.body.password));

    // res.send(req.body.username);
    User.findOne({username:req.body.username}, function(err, user) {
        console.log('the user found is ' + JSON.stringify(user));

        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }

        if(user && bcrypt.compareSync(req.body.password, user.password) && (req.body.username === user.username))
        {
            console.log('login complete');
            currSessionUser = req.body.username;
            return res.status(200).send('login done');
        }

        else
        {
            console.log('Username or password is incorrect');
            return res.status(401).send('Username or password is incorrect');
        }

    })
};

exports.signupUser = function(req, res){

    User.findOne({username: req.body.username}, function(err, user){
        if(err)
        {
            console.log(err);
            return res.status(400).send(err);
        }
        if(user)
        {
            console.log('username already taken');
            res.status(400).send('Username ' + req.body.username + ' is already taken');
        }
        else{
            matchPasswords();
        }
    })

    // matchPasswords();
    function matchPasswords() {
        console.log(req.body.password)
        console.log(req.body.retypePassword)

        if(req.body.password === req.body.retypePassword)
        {
            createUser();
        }
        else
        {
            console.log('passwords don\'t match');
            res.status(400).send('passwords do not match');
        }
    }

    // createUser();
    function createUser() {
        var newUser = new User(req.body);

        newUser.password = bcrypt.hashSync(req.body.password, 10);

        newUser.save(function(err){
            if(err)
            {
                console.log(err)
                res.status(400).send(err)
            }

            else
            {
                console.log('added new user to database');
                // res.sendStatus(200);
                res.json(newUser);

                // return res.redirect('/login');
            }
        })
    }

};

exports.getAllUser = function(req,res){
    User.find({}, function(err, data){
        if(err)
        {
            console.log(err)
            return res.status(400).send(err);
        }
        res.json(data);
    })
};
exports.getCurrentUser = function(req,res){

    console.log('backend get curr user')
    console.log(JSON.stringify(currSessionUser))
    User.findOne( {username: currSessionUser}, {password: 0}, function(err, user){
        if (err){
            console.log(err);
            return res.status(400).send(err)
        }

        if(!user){
            console.log('user not found');
            return res.status(404).send('user not found')
        }

        console.log('current user found is ' + JSON.stringify(user.name));
        return res.status(200).send(user)
        }
    );

};

exports.userByID = function(req, res, next, _id){
    console.log('back end controller id is ' + _id);
    User.findById(_id).exec(function(err, user){
        if(err)
        {
            console.log('user by id had error')
            res.status(400).send(err);
        }
        else
        {
            req.user = user;
            console.log('user found is ' + JSON.stringify(req.user))
            next();
        }
    });
};

exports.updateUser = function(req, res){
    console.log("backend update user")
    console.log('request body in update is ' + JSON.stringify(req.body))
    console.log(req.body.username);
    // console.log(req.body.password);
    console.log('curr session user is ' + JSON.stringify(currSessionUser))

    User.findOne({username: currSessionUser}, {username: true, email:true}, function(err, user){
        console.log('aaaaaa')
        if (err){
            console.log(err);
            return res.status(400).send(err)
        }
        else if(!user){
            console.log(err);
            return res.status(400).send(err)
        }

        //if the current username and the username you want to change it to are different
        if(user.username !== req.body.username)
        {
            //see if there is already a user with that username
            User.findOne( {username: req.body.username} , function(err, user){
                if (err){
                    console.log(err);
                    return res.status(400).send(err)
                }

                else if(user)
                {
                    console.log('found based on user name ' + user)
                    return res.status(400).send(user)
                }
            })
        }

        //if current email and email you want to change it to are different
        if(user.email !== req.body.email)
        {
            //see if a user already has this email
            User.findOne( {email: req.body.email} , function(err, user){
                if (err){
                    console.log(err);
                    return res.status(400).send(err)
                }

                else if(user) {
                    console.log('found based on email ' + user)

                    return res.status(401)
                }
                else {
                    console.log('no user or already taken email')

                    update();
                }

            })
        }
    })
    function update(){
        console.log('inside update backend')
        console.log(JSON.stringify(req.body));

        var user = req.body;

        if(req.body.password)
            user.password = bcrypt.hashSync(req.body.password, 10);

        var newUserInfo = {
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            password:user.password
        }

        currSessionUser = req.body.username;

        User.updateOne(newUserInfo, function(err){
            if(err)
            {
                console.log('unable to update user')
                return res.status(400).send(err)
            }
            else{
                console.log('updated user')
                return res.status(200).send('successful update')
            }
        })


    }

};

exports.logoutUser = function(req, res) {
    console.log('Goodbye ' + currSessionUser);
    currSessionUser = null;
    return res.status(200).send("Logged out!");
};



exports.deleteUser = function(req,res){
    console.log('delete user ' + JSON.stringify(currSessionUser));

    User.findOneAndDelete({username: currSessionUser}, function(err){
        if(err)
            {
                console.log('unable to delete user')
                return res.status(400).send(err)
            }
            else{
                console.log('deleted user')
                return res.status(200).send('successful update')
            }
    })
};
