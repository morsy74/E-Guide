const mongoose = require('mongoose');
const Joi = require('joi');
const { string, required } = require('joi');


const schema = mongoose.Schema({
    name:String,
    area:String,
    population:String,
    aboutTheCity:String,
    pic: String,
    lng: Number,
    lat: Number,
    comment : [Object]
});

schema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
  });

const City = mongoose.model('City', schema);


function validateCity(city) {
    const schema = Joi.object({
        name:Joi.string().min(3).max(100).required(),
        population:Joi.string().min(1).required(),
        area: Joi.string().min(1).required(),
        aboutTheCity:Joi.string().required(),
        lng:Joi.number().required(),
        lat:Joi.number().required()
    });

    return schema.validate(city);
}


exports.City = City;
exports.validateCity = validateCity;