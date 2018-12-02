var buying = require('../controllers/buyingServerController.js'),
    express = require('express'),
    router = express.Router();

    //List things that are being sold
    router.route('/')
      .get(buying.listAll)
      .post(buying.create);

    //Navigate to userDashboard then click create listing
    // router.route('/postListing')
    //   .post(buying.create);

    //If listing is found perform the following
    router.route('/:_id')
      .get(buying.read)
      .put(buying.update)
      .delete(buying.delete);

      //Find whether the listing is in the inventory
    //  router.param('itemId', buying.listingByID);

     /******* exports.listingByID = function(req, res, next, id) {
       Listing.findById(id).exec(function(err, listing) {
         if(err) {
           res.status(400).send(err);
         } else {
           req.listing = listing;
           next();
         }
       });
     };
     ********/
    router.param('_id', buying.listingByID);

    module.exports = router;
