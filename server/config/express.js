var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config');
    buyingRouter = require('../routes/buyingServerRoutes.js');
    sellingRouter = require('../routes/sellingServerRoutes.js')
    userRouter = require('../routes/userServerRoutes.js');
    loginRouter = require('../routes/loginServerRoutes.js');
    signupRouter = require('../routes/signupServerRoutes.js');
    
module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  // app.use(bodyParser.urlencoded({extended: true}));

  app.use(bodyParser.json());
  
  /**TODO
  Serve static files */
  // app.use('/', express.static('/../../client'));
  // app.use('/', express.static('/../../client/html/testLogin.html'));
  app.use('/', express.static('client'));

  /**TODO 
  Use the listings router for requests to the api */
  app.use('/buying', buyingRouter);
  app.use('/selling', sellingRouter);

  /**TODO 
  Go to homepage for all routes not specified */ 

  

  // app.use('/user', userRouter);

  app.use('/signup', signupRouter);

  // console.log('in express');
  app.use('/login/auth', loginRouter);
  
  app.use('/account', userRouter);

  // app.use('/account/update', userRouter);
  //for cancel button just follow jason's logout example in the html



  /**TODO 
  Go to homepage for all routes not specified */ 
  // app.all('/', function(req,res){
  //   // res.sendFile('/Users/cynthiamo/ufx/loginTest2/client/js/html/testLogin.html');
  //   // res.sendFile("/client/html/loginTest.html", {"root": __dirname});

  // });

  app.all('/*', function(req, res){
    res.redirect('/');
  });

  // app.use('/', express.static(__dirname + '/../../client/html/testLogin.html'))
  // app.use(express.static(__dirname + "/client"));

  return app;
};  