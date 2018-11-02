var userCtrl = require('../controllers/userServerController.js');
var loginCtrl = require('../controllers/loginServerController.js');
var signupCtrl = require('../controllers/signupServerController.js');

var express = require('express');
var router = express.Router();

//login controller

//  /user/login
router.route('/login/authenticate')
    .post(loginCtrl.authenticateUser)

//to do
//might need $window :(
router.route('/login/success')




//signup controller
//  /user/signup
router.route('/signup')
    .post(signupCtrl.registerUser)



//user controller
router.route('/account')
    .get(userCtrl.getCurrentUser)
    .put(userCtrl.updateUser)
    .delete(userCtrl.deleteUser)






