const { Restaurant } = require('../models/categories/restaurant');
const { Cafe } = require('../models/categories/cafe');
const { Club } = require('../models/categories/club');
const { Hotel } = require('../models/categories/hotel');
const { Tourist } = require('../models/categories/tourist-place');
const { Train } = require('../models/categories/train');
const { Bus } = require('../models/categories/bus')
exports.getTrend = async function (req, res, next) {
     const Restaurants = await Restaurant.find({ rate: 4.5 }).populate('city', 'name -_id').select("-comment");
     const Cafes = await Cafe.find({ rate: 4 }).populate('city', 'name -_id').select("-comment");
     const BusStation = await Bus.find({ rate: 5 }).populate('city', 'name -_id').select("-comment");
     const TrainStation = await Train.find({ rate: 5 }).populate('city', 'name -_id').select("-comment");
     const Hotels = await Hotel.find({ rate: 5 }).populate('city', 'name -_id').select("-comment");
     const TouristPlace = await Tourist.find({ rate: 5 }).populate('city', 'name -_id').select("-comment");
     const club = await Club.find({ rate: 5 }).populate('city', 'name -_id').select("-comment");
     //const city= await City.find()
     let home = [
          Restaurants,
          Cafes,
          BusStation,
          TrainStation,
          Hotels,
          TouristPlace,
          club
     ]
     
     res.status(200).json({
          "status": true,
          "message": "success",
          "data": home
     });
     next();
};

