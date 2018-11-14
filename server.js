var app = require('./server/config/app');
global.currSessionUser = null;
var server = app.start();