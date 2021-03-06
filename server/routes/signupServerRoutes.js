var userCtrl = require('../controllers/userServerController.js');
// var loginCtrl = require('../controllers/loginServerController.js');
// var signupCtrl = require('../controllers/signupServerController.js');

var express = require('express');
var router = express.Router();

router.route('/')
    .post(userCtrl.signupUser);

router.route('/:URL')
    .get(userCtrl.confirmUser);

module.exports = router;