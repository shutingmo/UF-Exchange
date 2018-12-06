var express = require('express'),
    mongoose = require('mongoose');
    Buying = require('../models/buyingServerModel.js');
    User = require('../models/userServerModel.js');
    fs = require('fs');
    multer = require('multer');

// Create a buying listing
exports.create = function(req, res) {

    /* Instantiate a Listing */
    var buying = new Buying(req.body);

    console.log('buying backend controller req.body is ' + JSON.stringify(req.body))
    console.log('buying document is ' + JSON.stringify(buying))

    console.log('curr session user is ' + currSessionUser)
    console.log('curr session user name is ' + currSessionUser.name)
    console.log('curr session user email is ' + currSessionUser.email)

    var buyerName;
    var buyerEmail;

  

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
        console.log('BUY BE: user found is ' + JSON.stringify(user))

        // console.log('buying before we put in buyer info is ' + JSON.stringify(buyer))
        buyerName = user.name;
        buyerEmail = user.email;

        console.log('buyer name is ' + buyerName)
        console.log('buyer email is ' + buyerEmail)

        saveToDB();
      }
    })

    function saveToDB(){
      console.log('buying.buyer.name before we set is ' + buying.buyer.name)
      console.log('buying.buyer.email before we set is ' + buying.buyer.email)

      buying.buyer.name = buyerName;
      buying.buyer.email = buyerEmail;

      console.log('buying.buyer.name after we set is ' + buying.buyer.name)
      console.log('buying.buyer.email after we set is ' + buying.buyer.email)

      buying.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(buying);
        }
      });
    }
  };

  //lists everything
  exports.listAll = function(req, res){
    Buying.find({}, function(err,data){
        res.json(data);
    });
  }

  //gets current buying item
  exports.read = function(req, res){
      res.json(req.buying);
  }

  //updates buying item
  exports.update = function(req, res){
      var buying = req.buying;

      buying.title = req.body.title;
      buying.category = req.body.category;
      buying.price = req.body.price;
      buying.description = req.body.description;
      buying.condition = req.body.condition;
      buying.location = req.body.location;
      buying.complete = req.body.complete;
      buying.buyer = req.body.buyer;
      buying.seller = req.body.seller;
      buying.flagged = req.body.flagged;

      res.json(buying);
  }

  exports.flagItem = function(req, res){
    console.log('in flag item update be')
    console.log(JSON.stringify(req.body))

    Buying.updateOne({_id: req.body._id}, { $set: { flagged: 'true' }}, function(err){
      if(err)
      {
          console.log('unable to flag')
          return res.status(400).send(err)
      }
      else{
          console.log('flagged item woohoo')
          return res.status(200).send('successful flag')
      }
    })
}

  exports.delete = function(req, res) {
    var buying = req.buying;
    console.log(req.buying)

    
    buying.remove(function(err)
    {
      if (err)
      {
        console.log(err);
        res.status(400).send(err);
      }
      else
      {
        res.json(selling);
      }
    })

  };

  exports.listingByID = function(req, res, next, id) {
    console.log('back end controller id is ' + id);
    Buying.findById(id).exec(function(err, buying) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.buying = buying;
      next();
    }
  });
};
