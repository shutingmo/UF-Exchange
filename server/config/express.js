var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    flash = require('express-flash'),
    session = require('express-session'),
    connectFlash = require('connect-flash'),
    multer = require('multer'), 
    upload = multer({limits: {fileSize: 2000000 },dest:'/uploads/'}) 



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

  // app.use(multer({ dest: "/uploads/",
  //   rename: function (fieldname, filename) {
  //     return filename;
  //   },
  //  }));

  
  //enable request logging for development debugging
  // app.use(session({
  //   secret : "secret string",
  //   resave: true,
  //   saveUninitialized: true
  // }));
  
  // app.use(require('connect-flash')());
  // app.use(function (req, res, next){
  //   res.locals.messages = require('express-messages')(req,res);
  //   next();
  // });
  // // initialise the flash middleware
  // app.use(flash());

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



  //app.use('/sellingListing', express.static('client/listing.html'));


  app.use('/signup', signupRouter);

  app.use('/login/auth', loginRouter);

  app.use('/account/getinfo', userRouter);

  app.use('/account/update',userRouter);

  app.use('/account/delete', userRouter);

  // app.use('/account/getFavs', userRouter);




  app.use('/buying', buyingRouter);
  app.use('/selling', sellingRouter);
  /**TODO
  Go to homepage for all routes not specified */
  // app.get('/selling/:_id', function(req, res) {
  //   console.log(req.params._id);
  //   var listingId = req.params._id;
  //   res.render(__dirname + "/client/js/html/listing.html", {_id: listingId});
  // });
  /**TODO
  Go to homepage for all routes not specified */



  // app.use('/user', userRouter);


  app.use('/signup', signupRouter);

  app.use('/login/auth', loginRouter);

  app.use('/account', userRouter);

  // app.use('/account/update', userRouter);
  //for cancel button just follow jason's logout example in the html

  

  // app.get('/', function (req, res) {
  //   req.flash('info', 'Welcome');
  //   res.render('index', {
  //     title: 'Home'
  //   })
  // });
  // app.get('/addFlash', function (req, res) {
  //   req.flash('info', 'Flash Message Added');
  //   // res.redirect('/');
  // });

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
