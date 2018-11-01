// var config = require('config.json');
var config = require('config.js');

var express = require('express');
var router = express.Router();
// var userService = require('services/user.service');
var mongoose = require('mongoose');

var User = require('../../models/user.server.model.js');


var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');

// var db = mongo.db(config.connectionString, { native_parser: true });
// db.bind('users');

mongoose.connect(config.db.uri);


// routes
// router.post('/authenticate', authenticateUser);
// router.post('/register', registerUser);
// router.get('/current', getCurrentUser);
// router.put('/:_id', updateUser);
// router.delete('/:_id', deleteUser);

// module.exports = router;


//testing new routes

router.route('/authenticate').post(authenticateUser);
router.route('/register').post(registerUser);
router.route('/current').get(getCurrentUser);

module.exports = router;

// function authenticateUser(req, res){
//     User.findOne({username: req.body.username}, function(err, user){
//         // console.log(req.body.username);
//         if(err)
//         {
//             // res.status(400).send(err);
//            throw err;
//         }
//         if(!user)
//         {
//             res.status(400).send('user not found');
//             console.log('user not here');
//         }
        
//         else if (user && bcrypt.compareSync(req.body.password, user.password)) {
//             // authentication successful
            
//             console.log('auth success');
//             // res.status(200).send('woohoo');
//             console.log('the user name is ' + user.name);
//             console.log(user);
//             // return res.json({ name: user.name, email: user.email, username: user.username});
//             return res.json({token: jwt.sign({ name: user.name, email: user.email, username: user.username}, 'RESTFULAPIs')});
//         } else {
//             // authentication failed
//             // res.status(400).json({ message: 'Authentication failed. Wrong password.' });

//             res.status(400).send('authentication failed. incorrect password');

//         }
//     })
// };

function authenticateUser(req, res){
    var token;
    User.findOne({username: req.body.username}, function(err, user){
        // console.log(req.body.username);
        if(err)
        {
            // res.status(400).send(err);
           throw err;
        }
        if(!user)
        {
            res.status(400).send('user not found');
            console.log('user not here');
        }
        
        else if (user && bcrypt.compareSync(req.body.password, user.password)) {
            // authentication successful
            
            console.log('auth success');
            // res.status(200).send('woohoo');
            console.log('the user name is ' + user.name);
            console.log(user);
            // return res.json({ name: user.name, email: user.email, username: user.username});
            // return res.json({token: jwt.sign({ name: user.name, email: user.email, username: user.username}, 'RESTFULAPIs')});
            // token = (jwt.sign({ sub: user._id }, 'shhh'));
            useToken((jwt.sign({ user: user._id }, 'shhh')));
        } else {
            // authentication failed
            // res.status(400).json({ message: 'Authentication failed. Wrong password.' });

            res.status(400).send('authentication failed. incorrect password');

        }
    })

    function useToken(token){
        if(token)
        {
            console.log('token is ' + token);
            res.send({token: token});
        }
        else{
            res.status(400).send('something went wrong');
        }

    }
};


function registerUser(req, res) {
    //make sure they're not already a registered user in the database
    User.findOne({username: req.body.username}, function(err, user){
        if(err) throw err;

        if(user)
        {
            res.status(400).send('Username ' + req.body.username + ' is already taken');
        }
        else{
            matchPasswords();
        }
    })

    function matchPasswords() {
    
        if(req.body.password === req.body.retypePassword)
        {
            createUser();
        }
        else
        {
            res.status(400).send('passwords do not match');
        }
    }

    function createUser() {
        var newUser = new User(req.body);

        newUser.password = bcrypt.hashSync(req.body.password, 10);

        newUser.save(function(err){
            if(err) 
            {
                throw err;
            }

            else
            {
                console.log('added new user to database');
                res.sendStatus(200);
                // return res.redirect('/login');
            }
        })
    }
}

function getCurrentUser(req, res) {
    console.log('hello');
    User.findById({_id}, function(err, user){
        if(err) throw err;

        if(user)
        {
            // return res.json(_.omit(user, 'password'));
            // return res.json({token: jwt.sign({ name: user.name, email: user.email, username: user.username}, 'RESTFULAPIs')});
            // res.send(_.omit(user,'password'));
            // res.send(user);
            // return res.json({token: jwt.sign({sub: user._id})});
            // var test = _.omit(user, 'password');

            console.log('user is' + user);
            return res.json({token: jwt.sign({ name: user.name, email: user.email, username: user.username}, 'RESTFULAPIs')});

        }
        else
        {
            res.status(404).send('user not found');
        }
    } )
}

function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}