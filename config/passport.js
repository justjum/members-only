
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool')
const bcrypt = require('bcryptjs');
const db = require('../db/queries')

// Set up local strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log('this')
      try {
        console.log('here');
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
        console.log(user)
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        // check match with bcrypt
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
        }
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
  );
  // Passport middleware
  passport.serializeUser((user, done) => {
    console.log('ther');
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    console.log('here');
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
  });