'use strict'
// require imports packages required by the application
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const passport = require('passport');

const HOST = 'localhost';
const PORT = 3000;

// load passport miidleware Config
require('./auth');

// server is a new instance of express (the web app framework)
let server = express();

var origin = [
    'http://localhost:8080',
];

// Cookie support
server.use(cookieParser());

// Application settings
server.use((req, res, next) => {
    // Globally set Content-Type header for the application
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

// Allow server to support differnt body content types (using the bidyParser package)
server.use(bodyParser.text());
server.use(bodyParser.json()); // support json encoded bodies
server.use(bodyParser.urlencoded({ extended: true })); // support url encoded bodies

// cors
// https://www.npmjs.com/package/cors
// https://codesquery.com/enable-cors-nodejs-express-app/
// Simple Usage (Enable All CORS Requests)
server.use(cors({ credentials: true, origin: true }));
server.options('*', cors()) // include before other routes

/* Configure server Routes to handle requests from browser */
// The home page
server.use('/', require('./routes/index'));
server.use('/CBA', require('./routes/CBA'));
server.use('/Achievement', require('./routes/Achievement'));
server.use('/student', require('./routes/student'));
server.use('/link', require('./routes/link'));
server.use('/login', require('./routes/login'));
server.use('/results', require('./routes/results'));


// catch 404 and forward to error handler
server.use(function (req, res, next) {
    var err = new Error('Not Found: '+ req.method + ":" + req.originalUrl);
    err.status = 404;
    next(err);
});

// Start the HTTP server using HOST address and PORT consts defined above
// Lssten for incoming connections
server.listen(PORT, HOST, function() {
    console.log(`Express server listening on http://${HOST}:${PORT}`);
});

// export this as a module, making the server object available when imported.
module.exports = server;