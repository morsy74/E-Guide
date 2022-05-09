const Joi = require("joi");
const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const { Tourist, validate } = require('../../models/categories/tourist-place');
const {User}= require('../../models/user/user');

exports.showAllTourists = async (req, res, next) => {
  const tourist = await Tourist.find().sort('name').select("-comment");
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": tourist
  });
  next();
};

exports.getTouristById = async function (req, res, next) {
  const tourist = await Tourist.findById(req.params.id).populate("city","name -_id").select("-comment");
  if (!tourist) return res.status(404).send("Not found check your id ");
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": tourist
  });
  next();
};

exports.getTouristByCityId = async function (req, res, next) {
  const tourist = await Tourist.find({ city: req.params.cityId }).select('-city -comment');
  if (!tourist) return res.status(404).send('Not found check your id ');
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": tourist
  });
  next();
};

exports.addTourist = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let tourist = new Tourist(_.pick(req.body,
    ['name', 'description', 'address', 'workTime', 'price', 'picture', 'lat', 'lng', 'city']));
  
    await tourist.save();
    res.send(tourist)
    next();
};

exports.editTourist = async (req, res, next) =>{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tourist = await Tourist.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    address: req.body.address,
    description: req.body.description,
    workTime: req.body.workTime,
    price: req.body.price,
    picture: req.body.picture,
    lat: req.body.lat,
    lng: req.body.lng,
    city: req.body.city
  }, {new: true});

  if (!tourist) return res.status(404).send("The tourist with the given ID is not found!..");
  res.send(tourist);
  next();
};

exports.deleteTourist = async (req, res, next) => {
  const tourist = await Tourist.findByIdAndRemove(req.params.id);

  if (!tourist) return res.status(404).send('The tourist with the given ID was not found.');
  res.send(tourist);
  next();
};

exports.addComment = async (req,res, next) => {
  const tourist = await Tourist.findById(req.params.touristId);
  const user = await User.findOne({_id:req.body.id});

  console.log(user);
  let  userName = function(){
      let localName = user.local.name;
      if (localName == null) return user.google.name;
      else return localName
  }
  
  let comment = tourist.comment;
  comment.push({
      "name": userName(),
      "text": req.body.text
  })

  await tourist.save();
  // res.send(comment);

  res.status(200).json({
      "status": true,
      "message": "Your comment in sent successfully",
      "data": comment
  });
}

exports.getTouristComments = async (req, res, next) => {
  const tourist = await Tourist.findById(req.params.touristId);
  res.status(200).json({
      "status": true,
      "message": "success",
      "data": tourist.comment
  });
}
