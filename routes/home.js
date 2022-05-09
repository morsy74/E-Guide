const home = require('../controller/home');
const express = require('express');
const router = express.Router();

router.get('/', home.getTrend);

module.exports = router;
