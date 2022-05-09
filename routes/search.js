const express = require('express');
const route = express.Router();
const search = require('../controller/search')

route.get('/',search.search)



module.exports=route;