const express = require('express');
const router = express.Router();
const forgotPassword = require('../../controller/user/forgotPassword');

router.post('/forgot_password', forgotPassword.forgotPassword);

module.exports = router;