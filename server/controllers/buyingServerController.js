var express = require('express'),
    mongoose = require('mongoose');
    Buying = require('../models/buyingServerModel.js');

// Create a buying listing 
exports.create = function(req, res) {

    /* Instantiate a Listing */
    var buying = new Buying(req.body);
  
    /* Then save the listing */
    buying.save(function(err) {
      if(err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.json(buying);
      }
    });
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

      buying.itemId = req.body.itemId;
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