var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { // remember this was index not home; this is for testing rn
  res.render('home', { title: 'CSC 317 App', name:"Timmy Tram", css: ['home.css'], js: ['home.js'] });
});

router.get('/login', (req, res, next) => {
  res.render('login', {title: 'Login', css: ['form.css']});
});

router.get('/registration', (req, res, next) => {
  res.render('registration', {title: 'Registration', css: ['form.css'], js: ['formValidation.js']});
});

router.get('/postimage', (req, res, next) => {
  res.render('postimage', {title : 'Post Images', css : ['form.css']});
});

router.get('/viewpost', (req, res, next) => {
  res.render('viewpost', {title : 'View Posts', css: ['viewpost.css']});
});

module.exports = router;
