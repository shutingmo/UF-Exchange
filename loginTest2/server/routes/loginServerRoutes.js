var userCtrl = require('../controllers/userServerController.js');
var loginCtrl = require('../controllers/loginServerController.js');
// var signupCtrl = require('../controllers/signupServerController.js');

var express = require('express');
var router = express.Router();

// //login controller

// //  /user/login
// router.route('/login/authenticate')
//     .post(loginCtrl.authenticateUser)

// //to do
// //might need $window :(
// router.route('/login/success')




// //signup controller
// //  /user/signup
// router.route('/signup')
//     .post(signupCtrl.signupUser)



// //user controller
// router.route('/account/:id')
//     // .get(userCtrl.getCurrentUser)
//     .put(userCtrl.updateUser)
//     .delete(userCtrl.deleteUser)

// router.route('/all')
//     .get(userCtrl.getAllUsers)

// router.route('/current')
//     .get(userCtrl.getCurrentUser)
// // router.param('userId', userCtrl.userById);


// router.route('/')
//     .post(userCtrl.signupUser)

router.route('/')
    .post(userCtrl.authenticateUser);



module.exports = router;




