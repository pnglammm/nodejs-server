"use strict";

var express = require('express');

var app = express();

require('console-info');

require('console-error');

require('console-warn');

require('console-success');

var colors = require('colors');

var path = require('path');

var Handlebars = require('handlebars');

Handlebars.registerPartial('myPartial', '{{_navbar}}');
Handlebars.registerPartial('myPartial', '{{_footer}}');

var bodyParser = require("body-parser");

require('dotenv').config(); // express.json


app.use(express.json()); //body-paser

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // public folder

app.use(express["static"]("public"));
app.use(express["static"](path.join(__dirname, 'public'))); // hbs

var exphbs = require('express-handlebars');

app.engine("hbs", exphbs.engine({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: "views/layout/",
  partialsDir: "views/partials/"
}));
app.set("view engine", ".hbs"); // db

var db = require('./config/db');

db.connect(); // my sesions

var session = require('express-session');

var mongoDB_session = require("connect-mongodb-session")(session);

var secretPanda = new mongoDB_session({
  uri: "mongodb+srv://PandaStore:7bVKscu4qZMClKtv@panda-store.1n0rld2.mongodb.net/PandaStore?retryWrites=true&w=majority",
  collection: "mySessions"
});
app.use(session({
  secret: "my secret",
  resave: false,
  saveUninitialized: false,
  store: secretPanda
})); // use route 

var route = require('./routes/index');

route(app); // port

var port = process.env.PORT || 1102; // running server

var log = console.log;
var success = console.success;
log("============================".rainbow.bold);
app.listen(port, function () {
  return log("| ".rainbow + "Server running on [".concat(port, "]").green.underline.bold + " |".rainbow);
});