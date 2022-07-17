const mongoose = require('mongoose');
const Joi = require('joi');

const reserveSchema = mongoose.Schema({
    
    UserId: {
        type: mongoose.Types.ObjectId,

    },
    Cafes: {
        type: mongoose.Types.ObjectId,
        ref: 'Cafes'
    },

    Restaurants: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant'
    },

    Hotels: {
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    },

    TouristPlace: {
        type: mongoose.Types.ObjectId,
        ref: 'Tourist'
    },
    
    Club: {
        type: mongoose.Types.ObjectId,
        ref: 'Club'
    },


});

booking= mongoose.model('booking',reserveSchema)