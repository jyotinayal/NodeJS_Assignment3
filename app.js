var createError = require('http-errors');
var express = require('express');
var path = require('path');
var routes = require('./routes/routes');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));
 
app.use('/', routes);

const server = app.listen(3000, () => {
	console.log('Server up at 3000')
})
const io = require('./socket').init(server);


