var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/userServerModel.js');
var bcrypt = require('bcryptjs');
var flash = require('express-flash');
var nodemailer = require('nodemailer');

// var body = require('body-parser');

// exports.getAllUsers = function(req, res){
//     User.find({}).then(function (err, users) {
//         if(err)
//         {
//             console.log(err)
//             return;
//         }
//         res.json(users);
//     });
// };

exports.authenticateUser = function(req, res){
    User.findOne({username:req.body.username}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }
        if(user && bcrypt.compareSync(req.body.password, user.password) && (req.body.username === user.username)) {
            if(user.banned === true) {
                res.status(400).send({message: 'you have been banned'});
            }
            else if(user.verified === true) {
                currSessionUser = req.body.username;
                res.status(200).send({message: 'test'});
            } else {
                console.log('Account not verified');
                res.status(412).send({message: 'Verify your account'})
            }
        } else {
            console.log('Username or password is incorrect');
            res.status(401).send({message: 'nope'});
        }
    })
};

exports.signupUser = function(req, res){
    checkEmailExists()
    function checkEmailExists(){
        User.findOne({email: req.body.email}, function(err, user) {
            if(err) {
                console.log(err);
                return res.status(400).send(err);
            }
            if(user) {
                console.log('email already taken');
                res.status(400).send('email ' + req.body.email + ' is already taken');
            } else {
                checkUsernameExists();
            }
        })
    }

    function checkUsernameExists(){
        User.findOne({username: req.body.username}, function(err, user) {
            if(err) {
                console.log(err);
                return res.status(400).send(err);
            }
            if(user) {
                console.log('username already taken');
                res.status(400).send('Username ' + req.body.username + ' is already taken');
            } else {
                matchPasswords();
            }
        })
    }

    function matchPasswords() {
        console.log(req.body.password)
        console.log(req.body.retypePassword)

        if(req.body.password === req.body.retypePassword) {
            createUser();
        } else {
            console.log('passwords don\'t match');
            res.status(400).send('passwords do not match');
        }
    }

    function createUser() {
        var newUser = new User(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, 10);

        newUser.save(function(err){
            if(err) {
                console.log(err)
                res.status(400).send(err)
            } else {
                console.log('added new user to database');
                verifyUser();
                res.json(newUser);
            }
        })
    }

    function verifyUser() {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "ufxteam",
                pass: "adobe321!"
            }
        });

        // setup email data with unicode symbols
        var mailOptions = {
            from: '"GLACKR" <ufxteam@gmail.com>', // sender address
            to: req.body.email, // receiver address
            subject: 'Activate Your UFX Account', // Subject line
            text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}', // plain text body
            html: '<p>Please verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>' // html body
        };

        // generate unique URL id using the _id field in MongoDB
        User.findOne( {username: req.body.username}, function(err, user) {
            if(err) {
                console.log(err);
                return res.status(400).send(err)
            }
            if(!user) {
                console.log('user not found');
                return res.status(404).send('user not found')
            }

            // replace ${URL} with the verification URL
            var r = /\$\{URL\}/g;
            var URL = 'http://localhost:3000/signup/' + user._id;
            mailOptions.text = mailOptions.text.replace(r, URL);
            mailOptions.html = mailOptions.html.replace(r, URL);

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return console.log(err);
                }
                console.log('Verification email sent');
            });
            }
        );
    }
};

exports.confirmUser = function(req, res) {
    // grab the id from the URL
    console.log('URL is ' + req.params.URL);
    var id = req.params.URL;

    // find a matching user using the id
    User.findById(id).exec(function(err, user) {
        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }
        if(!user) {
            console.log('your link has expired');
            return res.redirect('http://localhost:3000/js/html/expired.html');
        }
        verifyUser();
    })

    function verifyUser() {
        // set the verified field to 'true' and stop the document from expiring
        var verify = {
            $set: {"verified": true},
            $unset: {expire_at: ""}
        }

        User.findOneAndUpdate({_id: id}, verify, function(err) {
            if(err) {
                console.log('user unable to be verified');
                return res.status(400).send(err);
            } else {
                console.log('user has been verified');
                return res.redirect('http://localhost:3000/js/html/verified.html');
            }
        })
    }
}

exports.sendPassLink = function(req, res) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "ufxteam",
            pass: "adobe321!"
        }
    });
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }
        if(!user) {
            console.log('no such user');
            return res.status(400).send('User does not exist');
        } else {
            var mailOptions = {
                from: '"GLACKR" <ufxteam@gmail.com>', // sender address
                to: req.body.email, // receiver address
                subject: 'Change password link', // Subject line
                text: 'Change your password by clicking the following link, or by copying and pasting it into your browser: ${URL}', // plain text body
                html: '<p>Click <a href="${URL}">this link</a> to change your password. If you are unable to do so, copy and ' +
                    'paste the following link into your browser:</p><p>${URL}</p>' // html body
            };

            // replace ${URL} with the password change URL
            var r = /\$\{URL\}/g;
            var URL = 'http://localhost:3000/account/forgot/' + user._id;
            mailOptions.text = mailOptions.text.replace(r, URL);
            mailOptions.html = mailOptions.html.replace(r, URL);

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return console.log(err);
                }
                console.log('Password change email sent');
            });
        }
    })
}

exports.updatePass = function(req, res) {
    // grab the id from the URL
    console.log('URL is ' + req.params.URL);
    var id = req.params.URL;

    // find a matching user using the id
    User.findById(id).exec(function(err, user) {
        if(err) {
            console.log(err);
            return res.status(400).send(err);
        }
        if(!user) {
            console.log('user doesn\'t have an account');
            return res.status(404).send('user not found');
        }
        currSessionUser = user.username;
        return res.redirect('http://localhost:3000/js/html/account.html');
    })

    /*function matchPasswords() {
        if(req.body.password === req.body.retypePassword) {
            createUser();
        } else {
            console.log('passwords don\'t match');
            res.status(400).send('passwords do not match');
        }
    }

    function changePass() {
        var newUserInfo = {
            password: user.password
        }

        User.updateOne(newUserInfo, function(err) {
            if(err) {
                console.log('user unable to update');
                return res.status(400).send(err);
            } else {
                console.log('user pass has been updated');
                return res.status(200).send('Your password has been changed!');
            }
        })
    }*/
}

exports.getAllUser = function(req,res) {
    User.find({}, function(err, data) {
        if(err) {
            console.log(err)
            return res.status(400).send(err);
        }
        res.json(data);
    })
};
exports.getCurrentUser = function(req,res) {

    console.log('backend get curr user')
    console.log(JSON.stringify(currSessionUser))
    User.findOne( {username: currSessionUser}, {password: 0}, function(err, user){
        if (err){
            console.log(err);
            return res.status(400).send(err)
        }

        if(!user){
            console.log('user not found');
            return res.status(404).send('user not found')
        }

        console.log('current user found is ' + JSON.stringify(user.name));
        return res.status(200).send(user)
        }
    );

};

exports.userByID = function(req, res, next, _id){
    console.log('back end controller id is ' + _id);
    User.findById(_id).exec(function(err, user){
        if(err)
        {
            console.log('user by id had error')
            res.status(400).send(err);
        }
        else
        {
            req.user = user;
            console.log('user found is ' + JSON.stringify(req.user))
            next();
        }
    });
};

exports.updateUser = function(req, res){
    console.log("backend update user")
    console.log('request body in update is ' + JSON.stringify(req.body))
    console.log(req.body.username);
    // console.log(req.body.password);
    console.log('curr session user is ' + JSON.stringify(currSessionUser))

    User.findOne({username: currSessionUser}, {username: true, email:true}, function(err, user){
        console.log('aaaaaa')
        if (err){
            console.log(err);
            return res.status(400).send(err)
        }
        else if(!user){
            console.log(err);
            return res.status(400).send(err)
        }

        //if the current username and the username you want to change it to are different
        if(user.username !== req.body.username)
        {
            //see if there is already a user with that username
            User.findOne( {username: req.body.username} , function(err, user){
                if (err){
                    console.log(err);
                    return res.status(400).send(err)
                }

                else if(user)
                {
                    console.log('found based on user name ' + user)
                    return res.status(400).send(user)
                }
            })
        }

        //if current email and email you want to change it to are different
        if(user.email !== req.body.email)
        {
            //see if a user already has this email
            User.findOne( {email: req.body.email} , function(err, user){
                if (err){
                    console.log(err);
                    return res.status(400).send(err)
                }

                else if(user) {
                    console.log('found based on email ' + user)

                    return res.status(401)
                }
                else {
                    console.log('no user or already taken email')

                    update();
                }

            })
        }
    })

    function update(){
        console.log('inside update backend')
        console.log(JSON.stringify(req.body));

        var user = req.body;

        if(req.body.password)
            user.password = bcrypt.hashSync(req.body.password, 10);

        var newUserInfo = {
            name:req.body.name,
            username:req.body.username,
            email:req.body.email,
            password:user.password
        }

        currSessionUser = req.body.username;

        User.updateOne(newUserInfo, function(err){
            if(err)
            {
                console.log('unable to update user')
                return res.status(400).send(err)
            }
            else{
                console.log('updated user')
                return res.status(200).send('successful update')
            }
        })
    }
};

exports.logoutUser = function(req, res) {
    console.log('Goodbye ' + currSessionUser);
    currSessionUser = null;
    return res.status(200).send("Logged out!");
};

exports.deleteUser = function(req,res){
    console.log('delete user ' + JSON.stringify(currSessionUser));

    User.findOneAndDelete({username: currSessionUser}, function(err){
        if(err)
            {
                console.log('unable to delete user')
                return res.status(400).send(err)
            }
            else{
                console.log('deleted user')
                return res.status(200).send('successful update')
            }
    })
};

exports.delete = function(req, res) {
  console.log(req.user);
  var user = req.user;
  console.log(user);

  /** TODO **/
  /* Remove the article */

  user.remove(function(err)
  {
    if (err)
    {
      console.log(err);
      res.status(400).send(err);
    }
    else
    {
      res.json(user);
    }
  })

};

exports.getUserFavs = function(req,res){
    console.log('in get user favs ' + currSessionUser)

    User.findOne({username: currSessionUser}, 'favorite orders', function(err, user){
        if (err){
            console.log(err);
            return res.status(400).send(err)
        }

        if(!user){
            console.log('user not found');
            return res.status(404).send('user not found')
        }

        console.log('current user found is ' + JSON.stringify(user));
        return res.status(200).send(user)
        }
    );
}



exports.userByID = function(req, res, next, id) {
  console.log('back end controller id is ' + id);
  User.findById(id).exec(function(err, user) {
  if(err) {
    res.status(400).send(err);
  } else {
    req.user = user;
    next();
  }
});
};
