
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../db/pool')

// Set up local strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
      console.log('this')
      try {
        console.log('here');
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" });
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