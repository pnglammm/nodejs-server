var express = require('express');
var app = express();
require('console-info');
require('console-error');
require('console-warn');
require('console-success');
var colors = require('colors');
var path = require('path');
const Handlebars = require('handlebars');
Handlebars.registerPartial('myPartial', '{{_navbar}}')
Handlebars.registerPartial('myPartial', '{{_footer}}')
const bodyParser = require("body-parser");
require('dotenv').config();
// express.json
app.use(express.json());
//body-paser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// public folder
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
// hbs
var exphbs = require('express-handlebars');
app.engine(
    "hbs",
    exphbs.engine({
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: "views/layout/",
        partialsDir: "views/partials/",
    })
);
app.set("view engine", ".hbs");
// db
var db = require('./config/db');
db.connect();
// my sesions
const session = require('express-session');
const mongoDB_session = require("connect-mongodb-session")(session);
const secretPanda = new mongoDB_session({
    uri: "mongodb+srv://PandaStore:7bVKscu4qZMClKtv@panda-store.1n0rld2.mongodb.net/PandaStore?retryWrites=true&w=majority",
    collection: "mySessions",
});
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: secretPanda,
    })
);
// use route 
const route = require('./routes/index');
//  cors
app.get("/", (req, res) => {
    res.send(
        'SERVER ON /api/userAPI: get list user || api/productAPI: get list Product'
        )
})
const APIroute = require('./routes/api');
const cors = require("cors")
app.use("/api", cors({
    origin: '*'
}), APIroute)
app.get("*", (req, res) => {
    res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<")
});
route(app)


// port
var port = process.env.PORT || 1102;
// running server
const log = console.log;
const success = console.success;
log(`============================`.rainbow.bold)
app.listen(port, () =>
    log("| ".rainbow + `Server running on [${port}]`.green.underline.bold + " |".rainbow)
)