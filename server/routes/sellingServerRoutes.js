var selling = require('../controllers/sellingServerController.js'),
    express = require('express'),
    router = express.Router();

    //List things that are being sold
    router.route('/')
      .get(selling.listAll)
      .post(selling.create);


    router.route('/flag')
      .post(selling.update)

    //Navigate to userDashboard then click create listing
    // router.route('/postListing')
    //   .post(selling.create);

    //If listing is found perform the following
    router.route('/:_id')
      .get(selling.read)
      .put(selling.update)
      .delete(selling.delete);

    
      //Find whether the listing is in the inventory
    //  router.param('itemId', selling.listingByID);

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

     router.param('_id', selling.listingByID);

    module.exports = router;
