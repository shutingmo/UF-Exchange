var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/userServerModel.js');
var bcrypt = require('bcryptjs');



exports.authenticateUser = function(req, res){



};

exports.registerUser = function(req, res){

    User.findOne({username: req.body.username}, function(err, user){
        if(err) throw err;

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
            console.log('passwords dont match');
            res.status(400).send('passwords do not match');
        }
    }

    function createUser() {
        var newUser = new User(req.body);

        newUser.password = bcrypt.hashSync(req.body.password, 10);

        newUser.save(function(err){
            if(err) 
            {
                throw err;
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
            return res.status(200).send(err)
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
            return res.status(200).send(err)
        } 

        if(user.username !== req.body.username)
        {
            Users.findOne( {username: req.body.username} , function(err, user){
                if (err){
                    return res.status(200).send(err)
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
                    return res.status(200).send(err)
                } 

                if(user) {
                    return res.status(400).send('email ' + req.body.email + ' already taken')
                }
                else {
                    update();
                }
            })
        }
    })
};


exports.deleteUser = function(req,res){

};

