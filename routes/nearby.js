const express = require('express');
const route = express.Router();
const nearby = require('../controller/nearby')

route.get('/',nearby.search)



module.exports=route;