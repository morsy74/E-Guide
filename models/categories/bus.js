const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const BusStation = new Schema({
    name:String,
    address:String,
    rate:Number,
    price:String,
    pic:String,
    lat:Number,
    lng:Number,
    comment : [Object],
    city:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'City'
    }
})

BusStation.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

const Bus = mongoose.model('BusStation',BusStation);

function validateBus(bus){

    const schema= Joi.object({
        name:Joi.string().min(3).max(100).required(),
        address:Joi.string().min(3).required(),
        price:Joi.string().min(3).required(),
        lat:Joi.number().required(),
        lng:Joi.number().required(),
        city:Joi.required()
    });

    return schema.validate(bus);
}

module.exports.Bus=Bus;
module.exports.validateBus=validateBus;