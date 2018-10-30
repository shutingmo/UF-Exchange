require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
const RECAPTCHA_SECRET = '6Lf0tncUAAAAAPOfKlVKowNU9QhENAUsPzpHhXA_';


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// app.post('/register', function(req, res){
//     var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
//     recaptcha_url += "secret=" + RECAPTCHA_SECRET + "&";
//     recaptcha_url += "response=" + request.body["g-recaptcha-response"] + "&";
//     recaptcha_url += "remoteip=" + request.connection.remoteAddress;
//     Request(recaptcha_url, function(error, resp, body) {
//         body = JSON.parse(body);
//         if(body.success !== undefined && !body.success) {
//             return response.send({ "message": "Captcha validation failed" });
//         }
//         response.header("Content-Type", "application/json").send(body);
//     });
// })

// app.post('/',function(req,res){
//     // g-recaptcha-response is the key that browser will generate upon form submit.
//     // if its blank or null means user has not selected the captcha, so return the error.
//     if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
//       return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
//     }
//     // Put your secret key here.
//     var secretKey = RECAPTCHA_SECRET;
//     // req.connection.remoteAddress will provide IP address of connected user.
//     var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
//     // Hitting GET request to the URL, Google will respond with success or error scenario.
//     request(verificationUrl,function(error,response,body) {
//       body = JSON.parse(body);
//       // Success will be true or false depending upon captcha validation.
//       if(body.success !== undefined && !body.success) {
//         return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
//       }
//       res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
//     });
//   });
  

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});