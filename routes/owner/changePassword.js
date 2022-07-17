const express = require('express');
const router = express.Router();
const changePassword = require('../../controller/owner/changePassword');

router.post('/', changePassword.changePassword);

module.exports = router;