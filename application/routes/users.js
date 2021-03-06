const express = require('express');
const router = express.Router();
const db = require('../config/database');
const UserModel = require('../models/Users');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
const {registerValidator, loginValidator} = require('../middleware/validation');

router.use("/register", registerValidator);
router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  
  UserModel.usernameExists(username)
  .then((usernameDoesExist) => {
    if(usernameDoesExist) {
      throw new UserError("Registration Failed: Username already exists", "/registration", 200);
    } else {
      return UserModel.emailExists(email);
    }
  })
  .then((emailDoesExist) => {
    if(emailDoesExist) {
      throw new UserError("Registration Failed: Email already exists", "/registration", 200);
    } else {
      return UserModel.create(username, password, email);
    }
  })
  .then((createdUserId) => {
    if(createdUserId < 0) {
      throw new UserError("Server Error, user could not be created", "/registration", 500);
    } else {
      successPrint("User.js --> User was created!");
      req.flash('success', 'User account has been made!');
      req.session.save(err => {
        res.redirect('/login');
      });
    }
  })
  .catch((err) => {
    errorPrint("User could not be made", err);
    if(err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      let url = err.getRedirectURL();
      req.session.save(err => {
        res.redirect(url);
      });
    } else {
      next(err);
    }
  });
});

router.use('/login', loginValidator);
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  UserModel.authenticate(username, password)  
  .then((loggedUserId) => {
    if(loggedUserId > 0) {
      successPrint(`User ${username} is logged in`);
      req.session.username = username;
      req.session.userId = loggedUserId;
      res.locals.logged = true;
      req.flash('success', 'You have been successfully Logged in!');
      req.session.save((err) => {
        res.redirect('/');
      });
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