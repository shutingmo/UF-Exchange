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
    console.log('in update be')
    console.log(JSON.stringify(req.body))

    // Selling.updateOne({_id: req.body._id}, { $set: { flagged: 'true' }}, function(err){
    //   if(err)
    //   {
    //       console.log('unable to flag')
    //       return res.status(400).send(err)
    //   }
    //   else{
    //       console.log('flagged woohoo')
    //       return res.status(200).send('successful flag')
    //   }
    // })
  }
  exports.flagItem = function(req, res){
      console.log('in flag item update be')
      console.log(JSON.stringify(req.body))

      Selling.updateOne({_id: req.body._id}, { $set: { flagged: 'true' }}, function(err){
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

  exports.favoriteSelling = function(req,res){
      console.log('in fav selling be')
      console.log(JSON.stringify(req.body))
      console.log(currSessionUser)

      if(currSessionUser)
      {
        User.updateOne({username: currSessionUser}, {$push: { "favorite": req.body}}, function(err){
          if(err)
          {
          console.log('unable to fav item' + err)
          return res.status(400).send(err)
          }
          else{
          console.log('fav item woohoo')
          return res.status(200).send('successful fav')
          }   
        })

      }

  }

  exports.flagUser = function(req, res){
    console.log('in flag user update be')
    console.log(JSON.stringify(req.body.seller.email))

    User.updateOne({email: req.body.seller.email}, { $set: { banned: 'true' }}, function(err){
      if(err)
      {
          console.log('unable to flag user')
          return res.status(400).send(err)
      }
      else{
          console.log('flagged user woohoo')
          return res.status(200).send('successful flag')
      }
    })
  }

  exports.buyItemNow = function(req, res){
    console.log('in buynow selling be')
    console.log(JSON.stringify(req.body))
    console.log(currSessionUser)

    if(currSessionUser)
    {
      User.updateOne({username: currSessionUser}, {$push: { "orders": req.body}}, function(err){
        if(err)
        {
        console.log('unable to buy item' + err)
        return res.status(400).send(err)
        }
        else{
        console.log('buynow item woohoo')
        return res.status(200).send('successful buy now')
        }   
      })

    }
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
  /* Delete a listing */

  exports.delete = function(req, res) {
    var selling = req.selling;

    /** TODO **/
    /* Remove the article */

    selling.remove(function(err)
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
    Selling.findById(id).exec(function(err, selling) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.selling = selling;
      next();
    }
  });
};
