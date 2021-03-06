const Joi = require("joi");
const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const { Hotel, validate } = require('../../models/categories/hotel');
const {User}= require('../../models/user/user');
const { Owner } = require('../../models/owner/owner');

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

let hotel= new Hotel({
  name:req.body.name,
  address:req.body.address,
  pic:req.body.pic,
  singlePrice:req.body.singlePrice,
  doublePrice:req.body.doublePrice,
  inWishList:false,
  roomsNumbers:req.body.roomsNumbers,
  city:req.body.city,
  lat:req.body.lat,
  lng:req.body.lng,
  owner:req.owner._id
})
    await hotel.save();
    res.send(hotel)
    next();
};

exports.editHotel = async (req, res, next) =>{

  let owner = await Owner.findById(req.owner._id)
  if(!owner)return res.send('you are not owner of item')
  
  let hotel= await Hotel.findOne({ _id:req.params.id , owner:req.owner._id});
  if (!hotel) return res.status(404).send('Not found check your id');

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

   hotel = await Hotel.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    address: req.body.address,
    roomsNumber: req.body.roomsNumber,
    singlePrice: req.body.singlePrice,
    doublePrice: req.body.doublePrice,
    pic: req.body.pic,
    lat: req.body.lat,
    lng: req.body.lng,
    city: req.body.city
  }, {new: true});

  //if (!hotel) return res.status(404).send("The hotel with the given ID is not found!..");
  res.send(hotel);
  next();
};

exports.deleteHotel = async (req, res, next) => {
  if(req.user){
    if(req.user.local.isAdmin){

        const hotel = await Hotel.findByIdAndRemove(req.params.id);
        if (!hotel) return res.status(404).send('not found check your id')
        res.send(hotel);
    }
}
else{
const hotel = await Hotel.findOneAndDelete({_id:req.params.id, owner:req.owner.id});
        if (!hotel) return res.status(404).send('not found check your id')
        res.send(hotel);
    }
}


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


exports.addHotelReview= async(req,res,next)=>{
  const user = await User.findById(req.body.userId);
  if(!user)return res.send("can't send review must login");
  const hotel = await Hotel.findById(req.params.id);
  const review = hotel.review;
  
 let result= review.find((rev)=> rev.UserId==req.body.userId )
 if(result){
 console.log(result);
 return res.send("can't send review again ")
}else{

  let userName = function () {
      let localName = user.local.name;
      if (localName == null) return user.google.name;
      else return localName
  }

     review.push({
     
          "name": userName(),
          "UserId": req.body.userId,
          "rate": req.body.rate,
          "comment": req.body.comment,    
     })

     hotel.rate= review.reduce((total, num) => {
      return  rating = Math.round((total + (num.rate / review.length))*10)/10;
      //if(rating>5)return rating=5;

  },0);
  console.log(hotel.rate);
 
     await hotel.save();
 }


 res.status(200).json({
  "status": true,
  "message": "success",
  "data": review
})

}





exports.booking = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const hotel = await Hotel.findById(req.params.id);
  const booking = hotel.booking;

  let userName = function () {
      let localName = user.local.name;
      if (localName == null) 
      return user.google.name;
      else return localName
  }
      let result = booking.find((book) => JSON.stringify(book.UserId) ==  JSON.stringify(req.user._id)) //req.body.userId})

      if (result) {
  return res.send('cannot booking again');
  } else {
      booking.push({
          "name": userName(),
          "UserId": req.user._id,
          "price": req.body.price,
          "date": req.body.Date,
          "payed":true
      })
      
      await hotel.save();
  }

  res.status(200).json({
      "status": true,
      "message": "booked success",
      "data": booking
  })
}
