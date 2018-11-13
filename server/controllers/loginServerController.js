var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/userServerModel.js');
var config = require('../config/config.js');
var userCtrl = require('./userServerController.js');
var router = express.Router();


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

//Authenticate user
// router.post('/', function(req, res) {
// 	request.post({
// 		url: "http://localhost:" + config.port + "/user/login/authenticate",
// 		form: req.body,
// 		json: true
// 	}, function(err, response, body) {
// 		if(err) {
// 			console.log(err);
// 			return res.render('login', {err: 'An error occured'});
// 		}

// 		if(response.statuscode !== 200) {
// 			return res.render('login', {
// 				err: response.body,
// 				username: req.body.username
// 			});
// 		}

		/*//Redirect method one:
		req.session.success = 'Login successful';
		return res.redirect('userLanding');*/

		/*//Redirect method two:
		var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        res.redirect(returnUrl);*/
// 	});
// });

// //Logout user
// router.get('/', function(req, res) {
// 	delete req.session.token;

//     // move success message into local variable so it only appears once (single read)
//     var viewData = { success: req.session.success };
//     delete req.session.success;

//     res.render('login', viewData);
// });

// module.exports = router;