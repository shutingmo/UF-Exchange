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
    // upload = multer({dest:'uploads/'}) 
    GridFsStorage = require('multer-gridfs-storage'),
    Grid = require('gridfs-stream'),
    methodOverride = require('method-override')


    buyingRouter = require('../routes/buyingServerRoutes.js'),
    sellingRouter = require('../routes/sellingServerRoutes.js'),
    userRouter = require('../routes/userServerRoutes.js'),
    loginRouter = require('../routes/loginServerRoutes.js'),
    signupRouter = require('../routes/signupServerRoutes.js');

    ItemModel = require('../models/itemServerModel');
    SellingModel = require('../models/sellingServerModel');
    BuyingModel = require('../models/buyingServerModel');


module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  const conn = mongoose.createConnection(config.db.uri);

  //initialize app
  var app = express();

//   app.post('/itemImage', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//   })

//   app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
//   })

//   var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
//   app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })

  app.use(morgan('dev'));

  //body parsing middleware
  //body parsing middleware
  // app.use(bodyParser.urlencoded({extended: true}));


  app.use(bodyParser.json());

  app.use(methodOverride('_method'));
  app.set('view engine', 'ejs');
  // app.set('views', __dirname + '/../../views/index');

  // app.set('views', __dirname + '/views');


  

  let gfs;

  conn.once('open', function(){
    gfs = Grid(conn.db, mongoose.mongo);  
    gfs.collection('uploads');
  })

  const storage = new GridFsStorage({
    url: config.db.uri,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
      });
    }
  });
  
  const upload = multer({ storage });

  // @route GET /
// @desc Loads form
//this piece of code with just .get('/') will load the image uploader when you
//open localhost 3000
app.get('/imageupload', (req, res) => {
  console.log('are we here')
  res.render('index', { files: false });

  // gfs.files.find().toArray((err, files) => {
  //   // Check if files
  //   console.log(files)
  //   if (!files || files.length === 0) {
  //     console.log('aaaaaaaa')
  //     res.render('index', { files: false });
  //     // res.render(path.resolve(__dirname + "/views/index"));

  //   } else {
  //     files.map(file => {
  //       if (
  //         file.contentType === 'image/jpeg' ||
  //         file.contentType === 'image/png'
  //       ) {
  //         file.isImage = true;
  //       } else {
  //         file.isImage = false;
  //       }
  //     });
  //     res.render('index', { files: files });
  //   }
  // });
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  // res.json({ file: req.file });
  // res.redirect('/');
  console.log('req.body is ' + JSON.stringify(req.body))
  console.log('req.body.title is ' + JSON.stringify(req.body.title))
  console.log('req.body.price is ' + JSON.stringify(req.body.price))
  console.log('req.body.description is ' + JSON.stringify(req.body.description))

  console.log('req.file is ' + JSON.stringify(req.file))

  if(req.body.status === 'I want to Sell'){

    var sellingItem = new SellingModel(req.body)
    sellingItem.listingType = 'selling'

    if(req.file){
      sellingItem.image = req.file
    }
    console.log(sellingItem)

    sellingItem.save(function(err) {
      if(err) {
        console.log(err);
        // res.status(400).send(err);
      } else {
        // res.json(selling);
        console.log('did save selling item with image')
      }
    });
  }
  else if (req.body.status === 'I want to Buy'){
    
    var buyingItem = new BuyingModel(req.body)
    buyingItem.listingType = 'buying'

    if(req.file){
      buyingItem.image = req.file
    }

    console.log(buyingItem)
    buyingItem.save(function(err) {
      if(err) {
        console.log(err);
        // res.status(400).send(err);
      } else {
        // res.json(selling);
        console.log('did save buying item with image')
      }
    });
  }
  // console.log(JSON.stringify(item))
  
  console.log(req.file.id)
  gfs.files.find(req.file.id).toArray((err, files) => {
    // Check if files
    console.log(files)
    if (!files || files.length === 0) {
      console.log('aaaaaaaa')
      res.render('index', { files: false });
      // res.render(path.resolve(__dirname + "/views/index"));

    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });

});

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    const readstream = gfs.createReadStream(file.filename);
    return readstream.pipe(res);
  });
});



// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  console.log('express filenme ' + JSON.stringify(req.params.filename))

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    console.log('file is '+ file)
    console.log('file is '+ JSON.stringify(file))

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      // res.render('listing', {file:file});

      // res.sendFile('/Users/cynthiamo/ufx/client/js/html/listing.html', {files:file})
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

app.get('/image/:id', (req, res) => {
  console.log('express')
  console.log('express get single image req is  ' + JSON.stringify(req.params))
  gfs.files.findOne({ id: req.params.id }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    
    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);


    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.render('index', {files:false});
  });
});








//   app.post('/upload', upload.single('file'), (req, res) => {
//     res.redirect('/');
//   });
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
