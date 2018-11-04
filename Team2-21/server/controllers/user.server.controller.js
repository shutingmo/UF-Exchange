var mongoose = require('mongoose');
    User = require('../models/user.server.model.js');

//create a user item
exports.create = function(req, res) {
    //instantiate user item
    var user = new User(req.body);

    user.save(function(err) {
        if(err){
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json(user);
        }
    });
};

//to check the username and name
exports.userInfo = function(req, res){
    res.send("Name: " + req.body.name);
    res.send("Username: " + req.body.username);
};
