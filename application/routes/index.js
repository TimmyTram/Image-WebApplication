var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotecter').userIsLoggedIn;

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('home', { title: 'CSC 317 App', name:"Timmy Tram", css: ['home.css'], js: ['home.js'] }); <= remains of old home
  res.render('index', {title: 'CSC 317 App', css: ['form.css']});
  console.log(res.locals);
});

router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Login', css: ['form.css']});
});

router.get('/registration', (req, res, next) => {
  res.render('registration', {title: 'Registration', css: ['form.css'], js: ['formValidation.js']});
});

router.use('/postimage', isLoggedIn);
router.get('/postimage', (req, res, next) => {
  res.render('postimage', {title : 'Post Images', css : ['form.css']});
});

router.get('/viewpost', (req, res, next) => {
  res.render('viewpost', {title : 'View Posts', css: ['viewpost.css']});
});

module.exports = router;
