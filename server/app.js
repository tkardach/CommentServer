/**
 *  app.js establishes all things related to the backend and initializes them.
 */
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

var staticRoot = __dirname + "/../client/dist/client/";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
  //move on
    next();
  }
});

// Initialize api routes
require('./startup/routes')(app);

// Initialize Database
require('./startup/db')();

app.use(function(req, res, next) {
  //if the request is not html then move along
  var accept = req.accepts('html', 'json', 'xml');
  if (accept !== 'html') {
      return next();
  }

  // if the request has a '.' assume that it's for a file, move along
  var ext = path.extname(req.path);
  if (ext !== '') {
      return next();
  }

  fs.createReadStream(staticRoot + 'index.html').pipe(res);
});

app.use(express.static(staticRoot));


module.exports = app;