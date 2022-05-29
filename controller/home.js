const { Restaurant } = require('../models/categories/restaurant');
const { Cafe } = require('../models/categories/cafe');
const { Club } = require('../models/categories/club');
const { Hotel } = require('../models/categories/hotel');
const { Tourist } = require('../models/categories/tourist-place');
exports.getTrend = async function (req, res, next) {
     const Restaurants = await Restaurant.find({ rate: { $gte: 4.5 } }).populate('City', 'name -_id').select("-comment");
     const Cafes = await Cafe.find({ rate: { $gte: 4.5 } }).populate('City', 'name -_id').select("-comment");
     const Hotels = await Hotel.find({ rate: { $gte: 4.5 } }).populate('City', 'name -_id').select("-comment");
     const TouristPlace = await Tourist.find({ rate: { $gte: 4.5 } }).populate('City', 'name -_id').select("-comment");
     const club = await Club.find({ rate: { $gte: 4.5 } }).populate('City', 'name -_id').select("-comment");
     let home = {
          Restaurants,
          Cafes,
          Hotels,
          TouristPlace,
          club
     }
     
     res.status(200).json({
          "status": true,
          "message": "success",
          "data": home
     });
     next();
};

