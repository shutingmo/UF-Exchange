// var express = require('express');
// var mongoose = require('mongoose');
// var User = require('../models/userServerModel.js');
// var userCtrl = require('./userServerController.js');

// exports.signupUser = function(req, res){
//     var request = req;
//     var response = res;
//     userCtrl.signupUser((request, response), function(err){
//         if(err)
//         {
//             throw err;
//         }
//         else
//         {
//             //need to send user data back to html
//             response.status(200).send('registration successful')
//         }
//     })
// };