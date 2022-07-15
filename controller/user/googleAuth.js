const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');  
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../../models/user/user');

exports.googleAuth = async (req, res, next) => {
  const user = await User.findOne(req.user);
  const token = user.generateAuthToken();
  await user.save();
  userBack = {
    "id": user.id,
    "name": user.google.name,
    "email": user.google.email,
    "token": token
  }
  res.status(200).header('x-auth-token', token).json({
    "status": true,
    "message": "SignIn with google done successfully",
    "data": userBack
  });
  next();
}