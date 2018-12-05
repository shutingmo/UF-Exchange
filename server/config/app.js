var config = require('./config'), 
    mongoose = require('mongoose'),   
    express = require('./express');
    // cors = require('cors');
/*
var corsOptions = {
  origin: 'glackr.herokuapp.com',
  optionsSuccessStatus: 200
}
*/
module.exports.start = function() {
  var app = express.init();
  // app.use(cors());
  app.listen(config.port, function() {
    console.log('App listening on port', config.port);
  });
};