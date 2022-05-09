const express = require('express');
const app = express();

require("dotenv").config();
require('express-async-errors');
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT ||6000;
app.listen(port, ()=> console.log(`Listening on port ${port}`));