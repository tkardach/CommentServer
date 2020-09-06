/**
 *  app.js establishes all things related to the backend and initializes them.
 */
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  var regList = [
    'http.*://localhost.*',
    'http.*://127.0.0.1.*'
  ]

  let reg = new RegExp(regList.join("|"));
  var origin = req.headers.origin;
  if (origin && (whitelist.indexOf(origin) > -1 || reg.test(origin))) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With");

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

module.exports = app;