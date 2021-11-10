var express = require('express');
var router = express.Router();
var db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

  /**
   * TODO: server side validation
   */
  
  db.execute("SELECT * FROM users WHERE username=?", [username])
  .then(([results, fields]) => {
    if(results && results.length == 0) {
      return db.execute("SELECT * FROM users WHERE email=?", [email]);
    } else {
      throw new UserError("Registration Failed: Username already exists", "/registration", 200);
    }
  })
  .then(([results, fields]) => {
    if(results && results.length == 0) {
      let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());";
      return db.execute(baseSQL, [username, email, password]);
    } else {
      throw new UserError("Registration Failed: Email already exists", "/registration", 200);
    }
  })
  .then(([results, fields]) => {
    if(results && results.affectedRows) {
      successPrint("User.js --> User was created!");
      res.redirect('/login');
    } else {
      throw new UserError("Server Error, user could not be created", "/registration", 500);
    }
  })
  .catch((err) => {
    errorPrint("User could not be made", err);
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    } else {
      next(err);
    }
  });
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  /**
   * TODO: server side validation
   */

  let baseSQL = "SELECT username, password FROM users WHERE username=? AND password=?;";
  db.execute(baseSQL, [username, password])
  .then(([results, fields]) => {
    if(results && results.length == 1) {
      successPrint(`User ${username} is logged in`);
      res.locals.logged = true;
      res.render("home", { title: 'CSC 317 App', css: ['home.css'], js: ['home.js'] }); 
      // ^ Needa fix my CSS or something cuz w/o this no CSS applied
    } else {
      throw new UserError("Invalid username and/or password!", "/login", 200);
    }
  })
  .catch((err) => {
    errorPrint("User login failed");
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      res.redirect('/login');
    } else {
      next(err);
    }
  });
});

module.exports = router;