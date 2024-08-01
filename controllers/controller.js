var express = require('express');
var router = express.Router();
const db = require('../db/queries');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

/* GET home page. */
exports.indexGet = function(req, res, next) {
    res.render('index', { 
      title: 'Members Only',
      user: req.user,
     });
  };
  
exports.logOut = function(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(".")
    });
  };
  
exports.signUpGet = function (req, res, next) {
    res.render('sign-up', {title: 'Sign Up Form'})
  };
  
exports.signUpPost = [
  body("username", "Must be unique")
    .isLength({min:1})
    // Need to pass 'req' with the custom value
    .custom(async (value, { req }) => {
      const user = await db.getUser(req.body.username);
      console.log(user)
      if (user.length > 0) {
        throw new Error('Username already in use')
      }
    }),
  body("password", "Password must be more than five characters")
    .isLength({min:1}),
  body("confirm-password")
    .custom(async (value, { req }) => {
      if(value != req.body.password) {
        throw new Error('Passwords must be identical')
      }
    })

,

  async function(req, res, next) {
    const errors = validationResult(req);

    const newUser = {
      username: req.body.username,
      f_name: req.body.f_name,
      l_name: req.body.l_name
    }

    if (!errors.isEmpty()) {
      res.render('sign-up', {
        title: 'Sign Up Form',
        errors: errors.array(),
        newUser: newUser
      })
    } else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {
            await db.createUser(req.body.username, req.body.f_name, req.body.l_name, hashedPassword)
            res.redirect('/');
        } catch(err) {
            return next(err)
        }
      });
    }
  }]
  
exports.logInPost =
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
    })