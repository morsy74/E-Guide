const mongoose = require('mongoose');
const Joi = require('joi');

const touristPlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100
  },
  description:{
    type: String
  },
  address: {
    type: String,
    required: true,
  },
  workTime: {
    type: String,
    required: true
  },
  rate: {
    type: String,
    required:true
  },
  price: {
    type: String,
    required: true
  },
  pic: {
    type: [String],
    required:true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  comment : [Object],
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  }
});

touristPlaceSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});

const Tourist = mongoose.model('Tourist', touristPlaceSchema);

function validateTourist(tourist){

  const schema = Joi.object({ 
      name: Joi.string().max(100).required(),
      address: Joi.string().required(),
      description: Joi.string(),
      workTime: Joi.string().required(),
      rate:Joi.string().required(),
      price: Joi.string().required(),
      pic: Joi.required(),
      lng: Joi.number().required(),
      lat: Joi.number().required(),
      city:Joi.required()
  });

  return schema.validate(tourist);
}

exports.touristPlaceSchema = touristPlaceSchema;
exports.Tourist = Tourist;
exports.validate = validateTourist;
