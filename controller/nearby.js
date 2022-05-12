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

    if (req.query.lng ) {
        filter = { lng: {$gte:req.query.lng }};
    }

    if(req.query.lat){
        filter = { lat:{$gte: req.query.lat }};   
    }

    if (filter.lng || filter.lat ) {
        const Restaurants = await Restaurant.find(filter).populate('city', 'name -_id').select("-comment");
        const Cafes = await Cafe.find(filter).populate('city', 'name -_id').select("-comment");
        const BusStation = await Bus.find(filter).populate('city', 'name -_id').select("-comment");
        const TrainStation = await Train.find(filter).populate('city', 'name -_id').select("-comment");
        const Hotels = await Hotel.find(filter).populate('city', 'name -_id').select("-comment");
        const TouristPlace = await Tourist.find(filter).populate('city', 'name -_id').select("-comment");
        const club = await Club.find(filter).populate('city', 'name -_id').select("-comment");

        let result = {
            Restaurants,
            Cafes,
            BusStation,
            TrainStation,
            Hotels,
            TouristPlace,
            club
    }


            res.json({
                "status": true,
                "message": "success",
                "data": result
            });
        }

        else {
            return res.status(200).json({
                "status": true,
                "message": "you must send your location",
                
            });
        }

    next();
};
