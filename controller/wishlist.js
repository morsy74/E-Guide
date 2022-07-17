const { User } = require('../models/user/user');
const { WishList } = require('../models/wishlist');


exports.addRestaurantToWishlist = async (req, res, next) => {
    let items = await WishList.findOne({ Restaurants: req.body.restaurantId });
    if (items) return res.status(400).send('This item is already in your wishlist');
    let wishlist = new WishList({
        UserId: req.user._id,
        Restaurants: req.body.restaurantId
    });
    wishlist = await wishlist.save()
    res
        .status(200)
        .json({
            status: true,
            message: 'restaurant added successfully',
            data: wishlist
        });

    next();
}


exports.addCafeToWishlist = async (req, res, next) => {
    let items = await WishList.findOne({ Cafes: req.body.cafeId});
    if (items) return res.status(400).send('This item is already in your wishlist');
    let wishlist = new WishList({
        UserId: req.user._id,
        Cafes: req.body.cafeId
    });
    wishlist = await wishlist.save()
    res
        .status(200)
        .json({
            status: true,
            message: 'cafe added successfully',
            data: wishlist
        });

    next();
}

exports.addHotelToWishlist = async (req, res, next) => {
    let items = await WishList.findOne({ Hotels: req.body.hotelId });
    if (items) return res.status(400).send('This item is already in your wishlist');
    let wishlist = new WishList({
        UserId: req.user._id,
        Hotels: req.body.hotelId
    });
    wishlist = await wishlist.save()
    res
        .status(200)
        .json({
            status: true,
            message: 'hotel added successfully',
            data: wishlist
        });

    next();
}


exports.addTouristPlaceToWishlist = async (req, res, next) => {
    let items = await WishList.findOne({ TouristPlace: req.body.touristPlaceId });
    if (items) return res.status(400).send('This item is already in your wishlist');
    let wishlist = new WishList({
        UserId: req.user._id,
        TouristPlace: req.body.touristPlaceId
    });
    wishlist = await wishlist.save()
    res
        .status(200)
        .json({
            status: true,
            message: 'tourist place added successfully',
            data: wishlist
        });

    next();
}


exports.addClubToWishlist = async (req, res, next) => {
    let items = await WishList.findOne({ Club: req.body.clubId });
    if (items) return res.status(400).send('This item is already in your wishlist');
    let wishlist = new WishList({
        UserId: req.user._id,
        Club: req.body.clubId
    });
    wishlist = await wishlist.save()
    res
    .status(200)
        .json({
            status: true,
            message: 'club added successfully',
            data: wishlist
        });
        
    }
    
    
    exports.getWishlist = async (req, res, next) => {
        let list = await WishList.find({ UserId: req.user._id })
            .populate('Restaurants')
            .populate('Cafes')
            .populate('Hotels')
            .populate('TouristPlace')
            .populate('Club');
        res
            .status(200)
            .json({
                status: true,
                message: 'success',
                data: list
            });
        }
    
        exports.deleteFromWishlist= async (req,res,next)=>{
            let items = await WishList.findOneAndDelete({ _id:req.body.id });
            if (!items) return res.status(400).send('This item is already not  in your wishlist');   
            res
                .status(200)
                .json({
                    status: true,
                    message: 'item is deleted',
                    data: null
            });
        }

    
    
    
    
    /*exports.addTrainToWishlist = async (req, res, next) => {
        let items = await WishList.findOne({ Train: req.body.trainId });
        if (items) return res.status(400).send('This item is already in your wishlist');
        let wishlist = new WishList({
            UserId: req.user._id,
            Train: req.body.trainId
        });
        wishlist = await wishlist.save()
        res
            .status(200)
            .json({
                status: true,
                message: 'train station added successfully',
                data: wishlist
            });
    }*/


/*exports.addCityToWishlist = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user) res.status(404).send('you must login');
    let items = await WishList.findOne({ City: req.body.id });
    if (items) return res.status(400).send('This item is already in your wishlist');
    let wishlist = new WishList({
        UserId: req.params.id,
        City: req.body.id
    });
    wishlist = await wishlist.save()
    res
        .status(200)
        .json({
            status: true,
            message: 'city added successfully',
            data: wishlist
        });

    next();
}
*/


/*exports.addBusToWishlist = async (req, res, next) => {
    let user = await User.findById(req.params.id);
    if (!user) res.status(404).send('you must login');
    let items = await WishList.findOne({ Bus: req.body.id });
    if (items) return res.status(200).send('This item is already in your wishlist');
    let wishlist = new WishList({
        UserId: req.params.id,
        Bus: req.body.id
    });
    wishlist = await wishlist.save()
    res
        .status(200)
        .json({
            status: true,
            message: 'bus station added successfully',
            data: wishlist
        });

    next();
}
*/


    