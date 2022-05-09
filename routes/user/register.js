const passport = require('passport');
const express = require('express');
const router = express.Router();
const register = require('../../controller/user/register');
const googleAuth = require('../../controller/user/googleAuth');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const passportConfig = require('../../config/passport');

router.post('/', register.register);
router.post('/oauth/google',
  passport.authenticate('googleToken', {session: false}), googleAuth.googleAuth);
// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile'] }));

module.exports = router;