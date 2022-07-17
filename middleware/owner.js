const { func } = require('joi');
const jwt = require('jsonwebtoken');
const  {Owner}  = require('../models/owner/owner');

exports.owner = async function(req, res, next) {
    let token = req.header('authorization');//{بروتوكول علشان يتبعت من خلاله التوكن }
    if (!token) return res.status(401).send('Access denied. No token provided.');
    token = token.replace('Bearer ', '')//{علشان امسح البارير والمسافه ال قبل التوكن ال بيتبعتو }
  
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const owner = await Owner.findById(decoded._id)
      if(!owner)throw new Error("No owner Found with this token")
      req.owner = owner;//{علشان اضيف في الريكويست فاريبل اسمه يوزر فيه الداتا ال هستخدمها في البوست بعد كده }
      next();
    }
    catch(ex){
      res.status(400).send(ex.message)
    }
  }
  
  exports.allowedTo = (...roles) => {
    return (req, res, next) => {
      try {
        if(!roles.includes(req.owner.local.role)){
          throw new Error('This user is not allowed to access this route')
        }
        next()
      } catch (error) {
        res.status(404).send(error.message)
      }
    }
  }
  