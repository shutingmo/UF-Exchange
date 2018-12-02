var express = require('express'),
    mongoose = require('mongoose');
    Selling = require('../models/sellingServerModel.js');
    User = require('../models/userServerModel.js');

// Create a selling listing
exports.create = function(req, res) {

    /* Instantiate a Listing */
    var selling = new Selling(req.body);

    console.log('selling backend controller req.body is ' + JSON.stringify(req.body))
    console.log('selling document is ' + JSON.stringify(selling))

    console.log('curr session user is ' + currSessionUser)
    console.log('curr session user name is ' + currSessionUser.name)
    console.log('curr session user email is ' + currSessionUser.email)

    var sellerName;
    var sellerEmail;

    User.findOne({username:currSessionUser}, function(err, user) {
      // console.log('the user found is ' + JSON.stringify(user));
      if(err) {
        console.log(err);
        return res.status(400).send(err);
      }
      if(!user){
        console.log('user not found')
      }

      if(user){
        console.log('SELL BE: user found is ' + JSON.stringify(user))

        // console.log('buying before we put in buyer info is ' + JSON.stringify(buyer))
        sellerName = user.name;
        sellerEmail = user.email;

        console.log('seller name is ' + sellerName)
        console.log('seller email is ' + sellerEmail)

        saveToDB();
      }
    })

    function saveToDB(){
      console.log('selling.seller.name before we set is ' + selling.seller.name)
      console.log('selling.seller.email before we set is ' + selling.seller.email)

      selling.seller.name = sellerName;
      selling.seller.email = sellerEmail;

      console.log('selling.seller.name after we set is ' + selling.seller.name)
      console.log('selling.seller.email after we set is ' + selling.seller.email)

      selling.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(selling);
        }
      });
    }
    // /* Then save the listing */
    // selling.save(function(err) {
    //   if(err) {
    //     console.log(err);
    //     res.status(400).send(err);
    //   } else {
    //     res.json(selling);
    //   }
    // });
  };

  //lists everything
  exports.listAll = function(req, res){
    Selling.find({}, function(err,data){
        res.json(data);
    });
  }

  //gets current selling item
  exports.read = function(req, res){
    console.log('curr item ' + JSON.stringify(req.selling));
    res.json(req.selling);
  }

  //updates selling item
  exports.update = function(req, res){
      var selling = req.selling;

      selling.title = req.body.title;
      selling.category = req.body.category;
      selling.price = req.body.price;
      selling.description = req.body.description;
      selling.condition = req.body.condition;
      selling.location = req.body.location;
      selling.complete = req.body.complete;
      selling.buyer = req.body.buyer;
      selling.seller = req.body.seller;
      selling.flagged = req.body.flagged;

      res.json(selling);
  }

  // exports.listingByID = function(req, res, id) {
  //   Selling.find({itemId: id}).exec(function(err, data) {
  //     if(err) {
  //       res.status(400).send(err);
  //     } else {
  //       res.json(data);
  //       //req.selling = selling;
  //       //next();
  //     }
  //   });

  exports.listingByID = function(req, res, next, id) {
    console.log('back end controller id is ' + id);
    Selling.findById(id).exec(function(err, selling) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.selling = selling;
      next();
    }
  });
};
