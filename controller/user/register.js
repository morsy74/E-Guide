const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');  
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../../models/user/user');

exports.register =  async (req, res, next) =>{
  const { error } = validateUser(req.body);
  if(error) return res.status(200).json({
    "status": false,
    "message": error.details[0].message,
    "data": null
  });

  let user = await User.findOne({ "local.email": req.body.email}).exec();
  if(user) return res.status(200).json({
    "status": false,
    "message":"User already registered.",
    "data": null
  });
  
  
  user = new User({
    methods: 'local',
    local: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
  });
  
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(user.local.password, salt);
    user.local.password = hashPassword;
    await user.save();

    const token = user.generateAuthToken();

    const userBack = {
      "id": user.id,
      "name": user.local.name,
      "email": user.local.email,
      "token": token
    }
    res.status(200).header('x-auth-token', token).json({
      "status": true,
      "message": "Registration done successfully",
      "data": userBack
    });

  next();
};





