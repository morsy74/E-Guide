const { User } = require("../../models/user/user");
const { Token } = require("../../models/user/token");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");

exports.verifyCodeAndResetPass = async (req, res, next) => {
  try{
    const schema = Joi.object({ 
      token : Joi.number().required(),
      password: Joi.string().min(5).max(255).required() 
    });
    const { error } = schema.validate(req.body);
    if(error) return res.status(200).json({
      "status": false,
      "message": error.details[0].message,
      "data": null
    });

    let token = await Token.findOne({token: req.body.token});
     if(!token) return res.status(404).json({
      "status": false,
      "message": "This code is not correct!...."
    });
    
    const user = await User.findOne({_id: token.userId});
    if (!user) return res.status(400).send("invalid expired");


    const salt = await bcrypt.genSalt(10);
    user.local.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    await token.delete();

    res.json({
      "status": true,
      "message": "Password reset successfully"
    });
    
  } catch(error){
    res.send("An error occured");
    console.log(error);
  }
}