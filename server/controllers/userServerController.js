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

        if(user && (req.body.password === user.password) && (req.body.username === user.username))
        {
            console.log('login complete');
            return res.status(200).send('login done');
        }
        else
        {
            console.log('Username or password is incorrect');
            return res.status(401).send('Username or password is incorrect');
        }
        

        // if(user && bcrypt.compareSync(req.body.password, user.password))
        //     return res.sendstatus(200);
        // else
        //     return res.status(401).send('Username or password is incorrect');
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

        // newUser.password = bcrypt.hashSync(req.body.password, 10);

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
        res.json(data);
    })
};
exports.getCurrentUser = function(req,res){
    console.log('curr user ' + JSON.stringify(req.user));
    res.json(req.user);
    // User.findOne( {username: req.body.username}, {password: 0}, function(err, user){
    //     if (err){
    //         console.log(err);
    //         return res.status(400).send(err)
    //     } 

    //     if(!user){
    //         console.log('user not found');
    //         return res.status(404).send('user not found')
    //     } 

    //     return res.status(200).send(user)
    //     }
    // );

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
    console.log('request body in update is ' + JSON.stringify(req.body))
    console.log(req.body.username);
    console.log('request user is ' + JSON.stringify(req.user))
    // console.log(req.body.password);


    // User.findOne({username: req.body.username}, {username: true, email:true}, function(err, user){
    //     if (err){
    //         console.log(err);
    //         return res.status(400).send(err)
    //     } 

    //     if(user.username !== req.body.username)
    //     {
    //         Users.findOne( {username: req.body.username} , function(err, user){
    //             if (err){
    //                 console.log(err);
    //                 return res.status(400).send(err)
    //             } 

    //             if(user)
    //             {
    //                 return res.status(400).send('username ' + req.body.username + ' already taken')
    //             }
                
    //         })
    //     }
    //     if(user.email !== req.body.email)
    //     {
    //         Users.findOne( {email: req.body.email} , function(err, user){
    //             if (err){
    //                 console.log(err);
    //                 return res.status(400).send(err)
    //             } 

    //             if(user) {
    //                 return res.status(401).send('email ' + req.body.email + ' already taken')
    //             }
    //             else {
    //                 update();
    //             }
    //         })
    //     }
    // })
    function update(){

        /*//Jason Watmore's update method:
        var set = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        };

        if (req.body.password)
            set.password = bcrypt.hashSync(userParam.password, 10);

        User.update(
            { username: req.body.username },
            { $set: set },
            function(err, user)
                if(err) return res.status(400).send(err);
        );*/
        
        var user = req.user;
        user.name = req.body.name;
        user.username = req.body.username;
        user.email = req.body.email;

        if(req.body.password)
            user.password = bcrypt.hashSync(req.body.password, 10);

        user.save(function(err) {
            if(err) {
                console.log(err);
                return res.status(400).send(err);
            }
            else {
                console.log('Updated user attributes');
                res.json(user);
            }
        });
    }

};


// exports.deleteUser = function(req,res){
//     var user = req.user;

//     user.remove(function(err) {
//         if(err) {
//             console.log(err);
//             return res.status(400).send(err);
//         }
//         else
//             res.end();
//     })
// };

