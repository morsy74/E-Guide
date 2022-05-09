const mongoose = require('mongoose');
const logger = require('../config/logger')

module.exports = function(){
  mongoose.connect(process.env.DB,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => logger.error('Error connected to MongoDB..',err));
}