var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/userServerModel.js');
var bcrypt = require('bcryptjs');

exports.getAllUsers = function(req, res){
    User.find({}).then(function (err, users) {
        if(err)
        {
            console.log(err)
            return;
        }
        res.json(users);
    });
};

exports.authenticateUser = function(req, res){
    User.findOne({username:req.body.username}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }

        if(user && bcrypt.compareSync(req.body.password, user.password))
            return res.sendstatus(200);
        else
            return res.status(401).send('Username or password is incorrect');
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

    function matchPasswords() {
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

    function createUser() {
        var newUser = new User(req.body);

        newUser.password = bcrypt.hashSync(req.body.password, 10);

        newUser.save(function(err){
            if(err) 
            {
                console.log(err)
                return res.status(400).send(err)
            }

            else
            {
                console.log('added new user to database');
                res.sendStatus(200);
                // return res.redirect('/login');
            }
        })
    }

};

exports.getCurrentUser = function(req,res){
    User.findOne( {username: req.body.username}, {password: 0}, function(err, user){
        if (err){
            console.log(err);
            return res.status(400).send(err)
        } 

        if(!user){
            console.log('user not found');
            return res.status(404).send('user not found')
        } 

        return res.status(200).send(user)
        }
    );

};

exports.updateUser = function(req, res){
    User.findOne({username: req.body.username}, {username: true, email:true}, function(err, user){
        if (err){
            console.log(err);
            return res.status(400).send(err)
        } 

        if(user.username !== req.body.username)
        {
            Users.findOne( {username: req.body.username} , function(err, user){
                if (err){
                    console.log(err);
                    return res.status(400).send(err)
                } 

                if(user)
                {
                    return res.status(400).send('username ' + req.body.username + ' already taken')
                }
                
            })
        }
        if(user.email !== req.body.email)
        {
            Users.findOne( {email: req.body.email} , function(err, user){
                if (err){
                    console.log(err);
                    return res.status(400).send(err)
                } 

                if(user) {
                    return res.status(401).send('email ' + req.body.email + ' already taken')
                }
                else {
                    update();
                }
            })
        }
    })
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


exports.deleteUser = function(req,res){
    var user = req.user;

    user.remove(function(err) {
        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }
        else
            res.end();
    })
};

