const { Restaurant, Offer, validateRestaurant } = require('../../models/categories/restaurant');
const { User } = require('../../models/user/user');
const _ = require('lodash');
const { rest, result } = require('lodash');
const { Owner } = require('../../models/owner/owner');

exports.getRest = async function (req, res, next) {

    let filter = {};
    if (req.query.rate) {
        filter = { rate: req.query.rate };
    }
    if (req.query.cuisineType) {
        filter.cuisineType = { $regex: req.query.cuisineType };
    }

    const rest = await Restaurant.find(filter).populate('city', 'name -_id').select("-comment");
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": rest
    });
    next();
};

exports.getRestById = async function (req, res, next) {
    const rest = await Restaurant.findById(req.params.id).populate("city", "name -_id").select("-comment");
    if (!rest) return res.status(404).send("Not found check your id ");
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": rest
    });
    next();
};

exports.getRestByCityId = async function (req, res, next) {
    const rest = await Restaurant.find({ city: req.params.cityId }).select('-city -comment');
    if (!rest) return res.status(404).send('Not found check your id ');
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": rest
    });
    next();
}


exports.postRest = async function (req, res, next) {
    const { error } = validateRestaurant(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let rest = await Restaurant.findOne({ name: req.body.name, lat: req.body.lat, lng: req.body.lng });
    if (rest) return res.status(400).send('this restaurant is already here');
    
       rest = new Restaurant({
        name:req.body.name,
        address:req.body.address,
        pic:req.body.pic,
        menu:req.body.menu,
        workTime:req.body.workTime,
        inWishList:req.body.inWishList,
        cuisineType:req.body.cuisineType,
        city:req.body.city,
        lat:req.body.lat,
        lng:req.body.lng,
        owner:req.owner._id
       })
    
     rest = await rest.save();
    res.send(rest);
    next();
}

exports.putRest = async function (req, res, next) {

    let owner = await Owner.findById(req.owner._id)
    if(!owner)return res.send('you are not owner of item')
    //let rest = await Restaurant.findById(req.params.id);
    let rest= await Restaurant.findOne({ _id:req.params.id , owner:req.owner._id});
    if (!rest) return res.status(404).send('Not found check your id');
    const { error } = validateRestaurant(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    rest = await Restaurant.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            rate: req.body.rate,
            workTime: req.body.workTime,
            cuisineType: req.body.cuisineType,
            pic: req.body.pic,
            menu: req.body.menu,
            lat: req.body.lat,
            lng: req.body.lng,
            city: req.body.city,
           inWishList: req.body.inWishList
        }
    }, { new: true })

    rest = await rest.save();
    res.send(rest);

    next();
}

exports.deleteRest = async function (req, res, next) {
    if(req.user){
        if(req.user.local.isAdmin){

            const rest = await Restaurant.findByIdAndRemove(req.params.id);
            if (!rest) return res.status(404).send('not found check your id')
            res.send(rest);
        }
}
else{
    const rest = await Restaurant.findOneAndDelete({_id:req.params.id, owner:req.owner.id});
    if (!rest) return res.status(404).send('not found')
    res.send(rest);

}
}

exports.addComment = async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    const user = await User.findOne({ _id: req.body.id });

    console.log(user);
    let userName = function () {
        let localName = user.local.name;
        if (localName == null) return user.google.name;
        else return localName
    }

    let comment = restaurant.comment;
    comment.push({
        "name": userName(),
        "text": req.body.text
    })

    await restaurant.save();
    // res.send(comment);

    res.status(200).json({
        "status": true,
        "message": "Your comment in sent successfully",
        "data": comment
    });
}


exports.addReview = async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);
    const review = restaurant.review;
    let result = review.find((rev) => JSON.stringify(rev.UserId) == JSON.stringify(req.user._id))
    if (result) {
        return res.send('cannot send again');
    } else {
        review.push({
            "UserId": req.user._id,
            "rate": req.body.rate,
            "comment": req.body.comment,
        })
        await restaurant.save();
        
        restaurant.rate = review.reduce((total, num) => {
            return rating = Math.round((total + (num.rate / review.length)) * 10) / 10;
        }, 0);
        
        await restaurant.save();

    }

    res.status(200).json({
        "status": true,
        "message": "success",
        "data": review
    })


}


exports.deleteReviewFromRestaurant = async (req, res, next)=>{
    const restaurant = await Restaurant.findById(req.params.id);
    //console.log(restaurant);
    review = restaurant.review;
    //console.log('review is',review);
    element = review.find((rev) => JSON.stringify(rev.UserId) == JSON.stringify(req.user._id));
    //console.log('element is',element);
   if(!element)return res.status(404).send('User Review Not Found')
    element1 = review.id(req.body.id).remove();
    //console.log('delete review is',element1);
    await restaurant.save();

    res.send('success review deleted');


}




exports.booking = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const restaurant = await Restaurant.findById(req.params.id);
    const booking = restaurant.booking;

    let userName = function () {
        let localName = user.local.name;
        if (localName == null) 
        return user.google.name;
        else return localName
    }
        let result = booking.find((book) => JSON.stringify(book.UserId) ==  JSON.stringify(req.user._id)) //req.body.userId})
 
        if (result) {
    return res.send('cannot booking again');
    } else {
        booking.push({
            "name": userName(),
            "UserId": req.user._id,
            "price": req.body.price,
            "date": req.body.Date,
            "payed":true
        })
        
        await restaurant.save();
    }

    res.status(200).json({
        "status": true,
        "message": "booked success",
        "data": booking
    })
}


/*exports.addGetOffer = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    //if (!user) return res.send('you must login to get offer');

    let restaurant = await Restaurant.findById(req.body.id);
    //if (!restaurant) return res.send('this restaurant not found');

    console.log(user);
    console.log(restaurant);

    restaurant.offer.push({
        name: req.body.name,
        restaurant: req.body.id,
        //user: req.params.id,
        UserId: req.params.id
    });

    restaurant = await restaurant.save();

    res.status(200).json({
        "status": true,
        "message": "success",
        "data": restaurant.offer
    })
}


exports.GetOffer = async (req, res, next) => {

    const rest = await Restaurant.findById(req.params.id)
        .populate("offer.restaurant", "name -_id")
        .populate("offer.UserId.local", " name - _id");
    //console.log(rest);
    const offer1 = rest.offer

    //console.log(offer1); 
    res.send(offer1)
}


exports.getRestaurantComments = async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": restaurant.comment
    });
}*/