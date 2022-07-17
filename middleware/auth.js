const { func } = require('joi');
const jwt = require('jsonwebtoken');
//const  {Owner}  = require('../models/owner/owner');
const { User } = require('../models/user/user');

/*module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch(ex){
    res.status(400).send('Invalid token..')
  }
}*/




exports.auth = async function(req, res, next) {
  let token = req.header('authorization');//{بروتوكول علشان يتبعت من خلاله التوكن }
  if (!token) return res.status(401).send('Access denied. No token provided.');
  token = token.replace('Bearer ', '')//{علشان امسح البارير والمسافه ال قبل التوكن ال بيتبعتو }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id)
    if(!user)throw new Error("No User Found with this token")
    req.user = user;//{علشان اضيف في الريكويست فاريبل اسمه يوزر فيه الداتا ال هستخدمها في البوست بعد كده }
    next();
  }
  catch(ex){
    res.status(400).send(ex.message)
  }
}

exports.allowedTo = (...roles) => {
  return (req, res, next) => {
    try {
      if(!roles.includes(req.user.local.role)){
        throw new Error('This user is not allowed to access this route')
      }
      next()
    } catch (error) {
      res.status(404).send(error.message)
    }
  }
}
