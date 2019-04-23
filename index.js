'use strict';

const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
const queryParser = require('express-query-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(queryParser({
  parseNull: true,
  parseBoolean: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const emoji = require('./api/routers/emoji');
emoji(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);
