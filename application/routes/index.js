var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotecter').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;
const db = require('../config/database');


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

router.get('/post/:id(\\d+)', (req, res, next) => {
  let baseSQL = `
  SELECT u.username, p.title, p.description, p.photopath, p.created
  FROM users u
  JOIN posts p
  ON u.id=fk_userId
  WHERE p.id=?;
  `;

  let postId = req.params.id;

  db.execute(baseSQL, [postId])
  .then(([results, fields]) => {
    if(results && results.length) {
      let post = results[0];
      res.render('viewpost', {currentPost: post, css : ['viewpost.css']});
    } else {
      req.flash('error', 'This is not the post you are looking for!');
      req.session.save(err => {
        res.redirect('/');
      });
    }
  })


});

module.exports = router;
