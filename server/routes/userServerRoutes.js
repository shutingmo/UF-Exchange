var userCtrl = require('../controllers/userServerController.js');
var loginCtrl = require('../controllers/loginServerController.js');
var signupCtrl = require('../controllers/signupServerController.js');

var express = require('express');
var router = express.Router();

// router.route('/')
//     .get(userCtrl.getAllUser);

// router.route('/:_id')
//     .get(userCtrl.getCurrentUser)

router.route('/')
    .get(userCtrl.getCurrentUser)
    .post(userCtrl.updateUser)
    .delete(userCtrl.deleteUser);



// router.param('_id', userCtrl.userByID);

module.exports = router;




