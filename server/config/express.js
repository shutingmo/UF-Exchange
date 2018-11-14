var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),

    buyingRouter = require('../routes/buyingServerRoutes.js'),
    sellingRouter = require('../routes/sellingServerRoutes.js'),
    userRouter = require('../routes/userServerRoutes.js'),
    loginRouter = require('../routes/loginServerRoutes.js'),
    signupRouter = require('../routes/signupServerRoutes.js');



module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  //body parsing middleware
  // app.use(bodyParser.urlencoded({extended: true}));


  app.use(bodyParser.json());

  /**TODO
  Serve static files */

  app.use('/', express.static('client'));
  // app.get('/selling', function(req, res){
  //   res.redirect('client/js/html/homeLanding.html');
  //   res.sendFile(path.resolve('client/js/html/homeLanding.html'));
  // });
  // app.get('/selling/:_id', function(req, res){
  //   res.sendFile(path.resolve('client/js/html/listing.html'));
  // });



  //app.use('/sellingListing', express.static('client/listing.html'));


  app.use('/signup', signupRouter);

  app.use('/login/auth', loginRouter);

  app.use('/account/getinfo', userRouter);

  app.use('/account/update',userRouter);

  app.use('/account/delete', userRouter);




  app.use('/buying', buyingRouter);
  app.use('/selling', sellingRouter);

  /**TODO
  Go to homepage for all routes not specified */
  // app.get('/', function(req,res){
  //   res.redirect('/html/index.html');
  /**TODO
  Go to homepage for all routes not specified */



  // app.use('/user', userRouter);


  app.use('/signup', signupRouter);

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

  return app;

};
