const { Restaurant } = require('../models/categories/restaurant');
const { Cafe } = require('../models/categories/cafe');
const { Bus } = require('../models/categories/bus');
const { City } = require('../models/categories/city');
const { Club } = require('../models/categories/club');
const { Hotel } = require('../models/categories/hotel');
const { Tourist } = require('../models/categories/tourist-place');
const { Train } = require('../models/categories/train');


exports.search = async function (req, res, next) {

    let filter = {};

    if (req.query.name) {
        filter.name = { $regex: req.query.name };
     }
    if (req.query.cuisineType) {
        filter.cuisineType = { $regex: req.query.cuisineType };
    }


    if (req.query.rate) {
        filter.rate = { $regex: req.query.rate };
    }

if(filter.name || filter.cuisineType || filter.rate){
    const Restaurants = await Restaurant.find(filter).populate('city', 'name -_id').select("-comment");  
    const Cafes = await Cafe.find(filter).populate('city', 'name -_id').select("-comment");
    const BusStation = await Bus.find(filter).populate('city', 'name -_id').select("-comment");
    const TrainStation = await Train.find(filter).populate('city', 'name -_id').select("-comment");
    const Hotels = await Hotel.find(filter).populate('city', 'name -_id').select("-comment");
    const TouristPlace = await Tourist.find(filter).populate('city', 'name -_id').select("-comment");
    const club = await Club.find(filter).populate('city', 'name -_id').select("-comment");

    let result = [
        Restaurants,
        Cafes,
        BusStation,
        TrainStation,
        Hotels,
        TouristPlace,
        club
    ]

    for(var i = 0 ;i<=result.length;i++){
        if(result[i]==0){
            return res.send("can't find item")
        }
     
       return res.json({
        "status": true,
        "message": "success",
        "data":   result
        });
    }
}
else return res.send('enter search item')
    next();
};
