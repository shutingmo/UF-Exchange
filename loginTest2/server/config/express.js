var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config');
    userRouter = require('../routes/userServerRoutes.js');
    
module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());
  
  /**TODO
  Serve static files */
  // app.use('/', express.static('/../../client'));
  app.use('/', express.static('client'));


  /**TODO se
  Use the listings router for requests to the api */
  // app.use('/login', userRouter);
  // app.use('/signup', userRouter);
  // app.use('/account', userRouter);
  // app.user('/authenticate', userRouter);
  // app.user('/update', userRouter);
  // app.user('/delete', userRouter);

  app.use('/user', userRouter);
  
  //for cancel button just follow jason's logout example in the html



  /**TODO 
  Go to homepage for all routes not specified */ 
  // app.get('/', function(req,res){
  //   res.redirect('/html/index.html');
  // });

  // app.all('/*', function(req, res){
  //   res.redirect('/');
  // });

  app.use('/', express.static(__dirname + '/../../client/html/testLogin.html'))
  return app;
};  