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


  app.use(bodyParser.json());
  
  /**TODO
  Serve static files */
  
  app.use('/', express.static('client'));

  app.use('/signup', signupRouter);

  app.use('/login/auth', loginRouter);
  
  app.use('/account/getinfo', userRouter);

  app.use('/account/update',userRouter);

  app.use('/account/delete', userRouter);

 
  /**TODO 
  Use the listings router for requests to the api */
  app.use('/buying', buyingRouter);
  app.use('/selling', sellingRouter);

  /**TODO 
  Go to homepage for all routes not specified */ 

  app.use('/signup', signupRouter);

  app.use('/login/auth', loginRouter);
  
  app.use('/account', userRouter);


  app.all('/*', function(req, res){
    res.redirect('/');
  });

  return app;
};  