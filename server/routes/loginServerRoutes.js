var userCtrl = require('../controllers/userServerController.js');
// var loginCtrl = require('../controllers/loginServerController.js');

var express = require('express');
var router = express.Router();


router.route('/')
    .post(userCtrl.authenticateUser)
    .delete(userCtrl.logoutUser);


module.exports = router;




