var express = require('express'),
    mongoose = require('mongoose');
    Selling = require('../models/sellingServerModel.js');

// Create a selling listing
exports.create = function(req, res) {

    /* Instantiate a Listing */
    var selling = new Selling(req.body);

    /* Then save the listing */
    selling.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(selling);
      }
    });
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

      selling.itemId = req.body.itemId;
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
