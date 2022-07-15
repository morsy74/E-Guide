const jwt = require('jsonwebtoken');
const { User } = require('../models/user/user');

exports.profile = async (req, res, next) => {
  const token = req.header("authorization");
  // const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send('Access denied. No token provided.');

  // let decoded;
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let userId = decoded._id;
    console.log(decoded);

    let user = await User.findById(userId);
    if (!user) return res.status(200).json({
      "status": false,
      "message": "you must be registered or login",
      "data": null
    });

    const userBack = {
      "name": user.local.name,
      "email": user.local.email,
    };

    res.status(200).json({
      "status": true,
      "message": `Welcome ${user.local.name}`,
      "data": userBack
    });

    next();
  }
  catch(ex){
    res.status(400).send('Invalid token..')
  }

  
}