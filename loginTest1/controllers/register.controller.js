﻿var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');
var bodyParser = require('body-parser');

const RECAPTCHA_SECRET = '6Lf0tncUAAAAAPOfKlVKowNU9QhENAUsPzpHhXA_';

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    // register using api to maintain clean separation between layers
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('register', {
                //if there was an error, reload the register page
                //with name, username, and email
                //doesn't include password
                error: response.body,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});



module.exports = router;