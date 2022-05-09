const mongoose = require('mongoose');
const Joi = require('joi');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50
  },
  address: {
    type: String,
    required: true,
  },
  roomsNumbers: {
    type: Number,
    required: true
  },
  singlePrice: {
    type: String,
    required: true
  },
  doublePrice: {
    type: String,
    required: true
  },
  picture: {
    type: String
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
    ref: 'city',
    required: true
  }
});

hotelSchema.set('toJSON', {
  transform: function (doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
  }
});

const Hotel = mongoose.model('Hotel', hotelSchema);

function validateHotel(hotel){

  const schema = Joi.object({ 
      name: Joi.string().max(50).required(),
      address: Joi.string().required(),
      roomsNumbers: Joi.number().required(),
      singlePrice: Joi.string().required(),
      doublePrice: Joi.string().required(),
      picture: Joi.string(),
      lat: Joi.number().required(),
      lng: Joi.number().required(),
      city:Joi.objectId().min(20).max(50).required()
  });

  return schema.validate(hotel);
}

exports.hotelSchema = hotelSchema;
exports.Hotel = Hotel;
exports.validate = validateHotel;
