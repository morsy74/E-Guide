const express = require('express');
const router = express.Router();
const forgotPassword = require('../../controller/owner/forgotPassword');

router.post('/', forgotPassword.forgotPassword);

module.exports = router;