const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const { User, validateAuth } = require('../../models/user/user');

exports.login = async (req, res, next) => {
  const { error } = validateAuth(req.body); 
  if(error) return res.status(200).json({
    "status": false,
    "message": error.details[0].message,
    "data": null
  });

  let user = await User.findOne({"local.email": req.body.email});
  if(!user) return res.status(200).json({
    "status": false,
    "message":"Invalid email or password.",
    "data": null
  });

  const validPassword = await bcrypt.compare(req.body.password, user.local.password);
  if(!validPassword) return res.status(200).json({
    "status": false,
    "message":"Invalid email or password.",
    "data": null
  });

  const token = user.generateAuthToken();
  user.local.token = token;
  await user.save();
  const userBack = {
    "id": user.id,
    "name": user.local.name,
    "email": user.local.email,
    "token": user.local.token
  }
  res.status(200).header('x-auth-token', token).json({
    "status": true,
    "message": "SignIn done successfully",
    "data": userBack
  });
  
  next();
};

