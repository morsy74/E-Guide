const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');  
const bcrypt = require('bcrypt');
//const { User, validateUser } = require('../../models/user/user');
const { Owner,validateOwner } = require('../../models/owner/owner');

exports.register =  async (req, res, next) =>{
  const { error } = validateOwner(req.body);
  if(error) return res.status(200).json({
    "status": false,
    "message": error.details[0].message,
    "data": null
  });

  let owner = await Owner.findOne({ "local.email": req.body.email}).exec();
  if(owner) return res.status(200).json({
    "status": false,
    "message":"User already registered.",
    "data": null
  });
  
  
  owner = new Owner({
    methods: 'local',
    local: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role:req.body.role
    }
  });
  
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(owner.local.password, salt);
    owner.local.password = hashPassword;
    await owner.save();

    const token = owner.generateAuthToken();

    const userBack = {
      "id": owner.id,
      "name": owner.local.name,
      "email": owner.local.email,
      "token": token,
      "role":owner.local.role
    }
    res.status(200).header('authorization', token).json({
      "status": true,
      "message": "Registration done successfully",
      "data": userBack
    });

  next();
};





