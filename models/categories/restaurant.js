const mongoose = require('mongoose');
const Joi = require('joi');
const { object, types } = require('joi');


const reviewSchema = mongoose.Schema({
    rate: Number,
    date: { type: Date , default: Date.now },
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const bookingSchema = mongoose.Schema({
    payed:{
    type:Boolean,
    default:false
    },
    price: Number,
    date:String,
    name:String,
    UserId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});


const restaurantSchema = mongoose.Schema({
    name: String,
    address: String,
    rate: {
      type: Number,
      default:0
    },

    inWishList: {
        type: Boolean,
        default:false
      },
    workTime: String,
    cuisineType: String,
    pic: [String],
    menu: [String],
    lat: Number,
    lng: Number,
    comment: [Object],
    review:[reviewSchema],
    booking: [bookingSchema],
       city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

restaurantSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

function validateRestaurant(restaurant) {

    const schema = Joi.object({
       in_Favorites:Joi.boolean(),
        name: Joi.string().min(3).max(100).required(),
        address: Joi.string().min(3).required(),
        pic: Joi.required(),
        menu: Joi.required(),
        cuisineType: Joi.string().required(),
        workTime: Joi.string().min(7).max(10).required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
        city: Joi.required(),
        
    });

    return schema.validate(restaurant);
}

exports.Restaurant = Restaurant;
//exports.Offer = Offer;
exports.validateRestaurant = validateRestaurant;