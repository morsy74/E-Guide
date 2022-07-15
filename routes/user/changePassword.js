const express = require('express');
const router = express.Router();
const changePassword = require('../../controller/user/changePassword');

router.post('/changePassword/:id', changePassword.changePassword);

module.exports = router;