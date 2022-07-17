const passport = require('passport');
const express = require('express');
const router = express.Router();
const ownerRegister = require('../../controller/owner/regester');

router.post('/', ownerRegister.register);
module.exports = router;