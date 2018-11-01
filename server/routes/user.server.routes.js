var users = require('../controllers/user.server.controller.js'),
    express = require('express'),
    router = express.Router();

    //Navigate to Sign Up page and create user
    router.route('/:signUp')
      .post(users.create);

    //If user is found perform the following
    router.route('/:logIn/:username')
      .get(users.userInfo);
      // .put(listings.update)
      // .delete(listings.delete);



      //Find whether the listing is in the inventory
     router.param('username', users.usersByUsername);

     /******* exports.usersByID = function(req, res, next, username) {
       Listing.findByUsername(username).exec(function(err, user) {
         if(err) {
           res.status(400).send(err);
         } else {
           req.user = user;
           next();
         }
       });
     };
     ********/

     module.exports = router;
