//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb://team2user:glackr1@ds215822.mlab.com:15822/ufx', //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080
};

/* Now go to the JSONtoMongo.js file and include this file as a variable named 'config' with a require() */