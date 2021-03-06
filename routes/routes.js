const express = require('express');
var session = require('express-session');
var morgan = require("morgan");
var cookieParser = require("cookie-parser");
const router = express.Router();
const controllers = require('../controllers/controllers');
const validate = require('../middleware/validation');
const authToken = require('../middleware/authToken');
const { check } = require('express-validator/check');


router.get('/',  (req, res, next) => { res.render('signUp') });
router.get('/signup', (req, res, next) => { res.render('signUp') });
router.post('/signup', validate.validateRegUserData, controllers.signUp);
router.get('/signin',  (req, res, next) => { res.render('signIn') });
router.post('/signin', validate.validateLoginUserData, controllers.signIn);
router.get('/home', (req, res, next) => { res.render('home') });
router.post('/home', (req, res, next) => { res.render('home') });
router.get('/searchuser', (req, res, next) => { res.render('searchUser') });
router.post('/searchuser', authToken.authenticateToken, controllers.searchUser);
router.get('/alluser', (req, res, next) => { res.render('allUser') });
router.post('/alluser', authToken.authenticateToken,controllers.allUser);
router.get('/updateuser', (req, res, next) => { res.render('updateUser'); });
router.put('/updateuser', controllers.updateUser);
router.get('/notLoggedIn', (req, res, next) => { res.render('notLoggedIn'); });
router.post('/notLoggedIn', authToken.authenticateToken,controllers.notLoggedIn);
module.exports = router;
