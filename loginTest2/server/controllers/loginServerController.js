var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/userServerModel.js');

var userCtrl = require('/userServerControler.js');

exports.authenticateUser = function(req, res){
    var request = req;
    var response = res;
    userCtrl.authenticateUser((request, response), function(err){
        if(err)
        {
            throw err;
        }
        else
        {
            //need to send user data back to html
            response.status(200).send('login successful')
        }
    })
};