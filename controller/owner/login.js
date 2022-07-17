const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const { Owner, validateAuth } = require('../../models/owner/owner');

exports.login = async (req, res, next) => {
  const { error } = validateAuth(req.body); 
  if(error) return res.status(200).json({
    "status": false,
    "message": error.details[0].message,
    "data": null
  });

  let owner = await Owner.findOne({"local.email": req.body.email});
  if(!owner) return res.status(200).json({
    "status": false,
    "message":"Invalid email or password.",
    "data": null
  });

  const validPassword = await bcrypt.compare(req.body.password, owner.local.password);
  if(!validPassword) return res.status(200).json({
    "status": false,
    "message":"Invalid email or password.",
    "data": null
  });

  const token = owner.generateAuthToken();
  
  const ownerBack = {
    "id": owner.id,
    "name": owner.local.name,
    "email": owner.local.email,
    "token": token
  }
  res.status(200).header('authorization', token).json({
    "status": true,
    "message": "SignIn done successfully",
    "data": ownerBack
  });
  
  next();
};

