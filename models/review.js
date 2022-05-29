const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({


    rate: {
        type: Number,
        min: [1, 'min ratings is 1.0'],
        max: [5, 'max ratings is 5.0'],

    },
    comment: {
        type: String,
    },
    numOfRate: {
        type: Number,
    },

    UserId: {
        type:mongoose.Schema.Types.ObjectId,
    },

    Cafes: {
        type: mongoose.Types.ObjectId,
        ref: 'Cafes'
    },

    Restaurants: {
        type:mongoose.Schema.Types.ObjectId,
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

    Train: {
        type: mongoose.Types.ObjectId,
        ref: 'TrainStation'
    },

    Club: {
        type: mongoose.Types.ObjectId,
        ref: 'Club'
    },

    City: {
        type: mongoose.Types.ObjectId,
        ref: 'City'
    },

    Bus: {
        type: mongoose.Types.ObjectId,
        ref: 'BusStation'
    }


});


/*reviewSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
  });
*/

const Review = mongoose.model('Reviews', reviewSchema);

exports.Review = Review