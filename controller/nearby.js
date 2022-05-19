const { Restaurant } = require('../models/categories/restaurant');
const { Cafe } = require('../models/categories/cafe');
const { Bus } = require('../models/categories/bus');
const { Club } = require('../models/categories/club');
const { Hotel } = require('../models/categories/hotel');
const { Tourist } = require('../models/categories/tourist-place');
const { Train } = require('../models/categories/train');


exports.search = async function (req, res, next) {

    let lteLng = parseFloat(req.query.lng) + 0.01;
    let lteLat = parseFloat(req.query.lat) + 0.01;
    let gteLng = parseFloat(req.query.lng) - 0.01;
    let gteLat = parseFloat(req.query.lat) - 0.01;

    if (req.query.lat || req.query.lng ) {
        const Restaurants = await Restaurant
        .find({lng :{$gte: gteLng, $lte: lteLng}, lat: {$gte: gteLat, $lte: lteLat}})
        .populate('city', 'name -_id')
        .select("-comment");

        const Cafes = await Cafe
        .find({lng :{$gte: gteLng, $lte: lteLng}, lat: {$gte: gteLat, $lte: lteLat}})
        .populate('city', 'name -_id')
        .select("-comment");

        const BusStation = await Bus
        .find({lng :{$gte: gteLng, $lte: lteLng}, lat: {$gte: gteLat, $lte: lteLat}})
        .populate('city', 'name -_id')
        .select("-comment");

        const TrainStation = await Train
        .find({lng :{$gte: gteLng, $lte: lteLng}, lat: {$gte: gteLat, $lte: lteLat}})
        .populate('city', 'name -_id')
        .select("-comment");

        const Hotels = await Hotel
        .find({lng :{$gte: gteLng, $lte: lteLng}, lat: {$gte: gteLat, $lte: lteLat}})
        .populate('city', 'name -_id')
        .select("-comment");

        const TouristPlace = await Tourist
        .find({lng :{$gte: gteLng, $lte: lteLng}, lat: {$gte: gteLat, $lte: lteLat}})
        .populate('city', 'name -_id')
        .select("-comment");

        const club = await Club
        .find({lng :{$gte: gteLng, $lte: lteLng}, lat: {$gte: gteLat, $lte: lteLat}})
        .populate('city', 'name -_id')
        .select("-comment");

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
