var express = require('express');
var router = express.Router();
const controller = require('../controllers/controller')

/* GET home page. */
router.get('/', controller.indexGet);

router.get('/log-out', controller.logOut);

router.get('/sign-up', controller.signUpGet);

router.post('/sign-up', controller.signUpPost);

router.post('/log-in', controller.logInPost);

router.get('/create-message', controller.createMessageGet);

router.post('/create-message', controller.createMessagePost);

router.get('/membership', controller.membershipGet);

router.post('/membership', controller.membershipPost);

module.exports = router;
