const express = require('express');
const router = express.Router();
const resetPassword = require('../../controller/owner/resetPassword');

router.post('/', resetPassword.verifyCodeAndResetPass);

module.exports = router;
