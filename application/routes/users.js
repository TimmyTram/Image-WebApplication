const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
const bcrypt = require('bcrypt');
const {registerValidator, loginValidator} = require('../middleware/validation');

router.use("/register", registerValidator);
router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

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
      return bcrypt.hash(password, 15);
    } else {
      throw new UserError("Registration Failed: Email already exists", "/registration", 200);
    }
  })
  .then((hashedPassword) => {
    let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());";
    return db.execute(baseSQL, [username, email, hashedPassword]);
  })
  .then(([results, fields]) => {
    if(results && results.affectedRows) {
      successPrint("User.js --> User was created!");
      req.flash('success', 'User account has been made!');
      req.session.save(err => {
        res.redirect('/login');
      });
      //res.redirect('/login');
    } else {
      throw new UserError("Server Error, user could not be created", "/registration", 500);
    }
  })
  .catch((err) => {
    errorPrint("User could not be made", err);
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    } else {
      next(err);
    }
  });
});

router.use('/login', loginValidator);
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let baseSQL = "SELECT id, username, password FROM users WHERE username=?;";
  let userId;
  db.execute(baseSQL, [username])
  .then(([results, fields]) => {
    if(results && results.length == 1) {
      let hashedPassword = results[0].password;
      userId = results[0].id;
      return bcrypt.compare(password, hashedPassword); 
    } else {
      throw new UserError("invalid username and/or password!", "/login", 200);
    }
  })
  .then((passwordsMatched) => {
    if(passwordsMatched) {
      successPrint(`User ${username} is logged in`);
      req.session.username = username;
      req.session.userId = userId;
      res.locals.logged = true;
      req.flash('success', 'You have been successfully Logged in!');
      
      req.session.save((err) => {
        res.redirect('/'); // <= Gotta force save before redirect so things display properly.
      });
      //res.redirect('/'); <= This does not work for me, flash and logout does not update because things aren't being saved
    } else {
      throw new UserError("Invalid username and/or password!", "/login", 200);
    }
  })
  .catch((err) => {
    errorPrint("User login failed");
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect('/login');
    } else {
      next(err);
    }
  });
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if(err) {
      errorPrint('session could not be destroyed.');
      next(err);
    } else {
      successPrint('session was destroyed.');
      res.clearCookie('csid');
      res.json({status : "OK", message : "user is logged out"});
    }
  });
});

module.exports = router;