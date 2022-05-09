const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ 
      filename: 'error.log',
      level: 'error',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json())
    }),
    new winston.transports.MongoDB({
      level: 'error',
      options: { useUnifiedTopology: true },
      db: 'mongodb+srv://admin:project123@cluster0.mqiiy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    })
  ]
});

module.exports = logger;  