var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Timmy Tram", css: ['home.css'], js: ['home.js'] });
});

router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Login', header: 'LOGIN', css: ['form.css']});
});

router.get('/registration', (req, res, next) => {
  res.render('registration', {title: 'Registration', header: 'REGISTRATION', css: ['form.css'], js: ['formValidation.js']});
});

router.get('/postimage', (req, res, next) => {
  res.render('postimage', {title : 'Post Images', header: 'POST IMAGES', css : ['form.css']});
});

router.get('/viewpost', (req, res, next) => {
  res.render('viewpost', {title : 'View Posts', css: ['viewpost.css']});
});

module.exports = router;
