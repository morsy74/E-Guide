const mongoose = require('mongoose');
const Joi = require('joi');


const reviewSchema = mongoose.Schema({
  rate: Number,
  date: { type: Date , default: Date.now },
  UserId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
  }
});

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50
  },
  address: {
    type: String,
    required: true,
  },
  workTime: {
    type: String,
    required: true
  },
  rate:{
    type:Number,
    default:0
  },
  price: {
    type: String,
    required: true
  },
  pic: {
    type: [String]
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
  review:[reviewSchema],
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'city',
    required: true
  }
});

clubSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});

const Club = mongoose.model('Club', clubSchema);

function validateClub(club){

  const schema = Joi.object({ 
      name: Joi.string().max(50).required(),
      address: Joi.string().required(),
      workTime: Joi.string().required(),
      price: Joi.string().required(),
      rate: Joi.string().required(),
      pic: Joi.required(),
      lng: Joi.number().required(),
      lat: Joi.number().required(),
      city:Joi.required()
  });

  return schema.validate(club);
}

exports.clubSchema = clubSchema;
exports.Club = Club;
exports.validate = validateClub;
