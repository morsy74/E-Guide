const express = require('express');
const router = express.Router();
const profile = require('../controller/profile');

router.get('/profile', profile.profile);

module.exports = router;