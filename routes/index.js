var express = require('express');
var router = express.Router();
const db = require('../db/queries');
const passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Members Only',
    user: req.user,
   });
});

router.get('/log-out', function(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(".")
  });
});

router.get('/in', function (req, res, next) {
  res.render('in', {title: 'You are in'})
})

router.post('/sign-up', async function(req, res, next) {
  try {
    await db.createUser(req.body.username, req.body.f_name, req.body.l_name, req.body.password);
    res.redirect('/')
  } catch(err) {
    return next(err)
  }
});

router.post('/log-in', 
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
)



module.exports = router;
