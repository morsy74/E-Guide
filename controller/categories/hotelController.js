const Joi = require("joi");
const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const { Hotel, validate } = require('../../models/categories/hotel');
const {User}= require('../../models/user/user');

exports.showAllHotels = async (req, res, next) => {
  const hotel = await Hotel.find().sort('name').select("-comment");
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": hotel
  });
  next();
};

exports.getHotelById = async function (req, res, next) {
  const hotel = await Hotel.findById(req.params.id).populate("city","name -_id").select("-comment");
  if (!hotel) return res.status(404).send("Not found check your id ");
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": hotel
  });
  next();
};

exports.getHotelByCityId = async function (req, res, next) {
  const hotel = await Hotel.find({ city: req.params.cityId }).select('-city -comment');
  if (!hotel) return res.status(404).send('Not found check your id ');
  res.status(200).json({
    "status": true,
    "message": "success",
    "data": hotel
  });
  next();
};

exports.addHotel = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let hotel = new Hotel(_.pick(req.body,
    ['name', 'address', 'roomsNumbers', 'singlePrice', 'doublePrice', 'picture', 'lat', 'lng', 'city']));
  
    await hotel.save();
    res.send(hotel)
    next();
};

exports.editHotel = async (req, res, next) =>{
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const hotel = await Hotel.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    address: req.body.address,
    roomsNumber: req.body.roomsNumber,
    singlePrice: req.body.singlePrice,
    doublePrice: req.body.doublePrice,
    picture: req.body.picture,
    lat: req.body.lat,
    lng: req.body.lng,
    city: req.body.city
  }, {new: true});

  if (!hotel) return res.status(404).send("The hotel with the given ID is not found!..");
  res.send(hotel);
  next();
};

exports.deleteHotel = async (req, res, next) => {
  const hotel = await Hotel.findByIdAndRemove(req.params.id);

  if (!hotel) return res.status(404).send('The hotel with the given ID was not found.');
  res.send(hotel);
  next();
};

exports.addComment = async (req,res, next) => {
  const hotel = await Hotel.findById(req.params.hotelId);
  const user = await User.findOne({_id:req.body.id});

  console.log(user);
  let  userName = function(){
      let localName = user.local.name;
      if (localName == null) return user.google.name;
      else return localName
  }
  
  let comment = hotel.comment;
  comment.push({
      "name": userName(),
      "text": req.body.text
  })

  await hotel.save();
  // res.send(comment);

  res.status(200).json({
      "status": true,
      "message": "Your comment in sent successfully",
      "data": comment
  });
}

exports.getHotelComments = async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.hotelId);
  res.status(200).json({
      "status": true,
      "message": "success",
      "data": hotel.comment
  });
}