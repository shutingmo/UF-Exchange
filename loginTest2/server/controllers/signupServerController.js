var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/userServerModel.js');

exports.registerUser = function(req, res){
    var request = req;
    var response = res;
    userCtrl.registerUser((request, response), function(err){
        if(err)
        {
            throw err;
        }
        else
        {
            //need to send user data back to html
            response.status(200).send('registration successful')
        }
    })
};