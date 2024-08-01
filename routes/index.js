var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller')

/* GET home page. */
router.get('/', controller.indexGet);

router.get('/log-out', controller.logOut);

router.get('/sign-up', controller.signUpGet);

router.post('/sign-up', controller.signUpPost);

router.post('/log-in', controller.logInPost);



module.exports = router;
