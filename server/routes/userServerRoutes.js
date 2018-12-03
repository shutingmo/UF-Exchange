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

router.route('/getFavs')
  .get(userCtrl.getUserFavs)

router.route('/admin')
  .get(userCtrl.getAllUser);

router.route('/admin/:_id')
  .delete(userCtrl.delete);

// router.param('_id', userCtrl.userByID);
 router.param('_id', userCtrl.userByID);

module.exports = router;
