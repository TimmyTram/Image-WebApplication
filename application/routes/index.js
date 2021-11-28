var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotecter').userIsLoggedIn;
var {getRecentPosts, getPostById} = require('../middleware/postsmiddleware');

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', {title: 'CSC 317 App', css: ['form.css', 'index.css', 'card.css']});
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

router.get('/post/:id(\\d+)', getPostById, (req, res, next) => {
  res.render('viewpost', {title: `Post ${req.params.id}`, css : ['viewpost.css']});
});

module.exports = router;
