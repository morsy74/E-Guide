const { Restaurant,validateRestaurant} =require('../../models/categories/restaurant');
const {User}= require('../../models/user/user');
const _ = require('lodash');

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
  const rest = await Restaurant.findById(req.params.id).populate("city","name -_id").select("-comment");
  if (!rest) return res.status(404).send("Not found check your id ");
   res.status(200).json({
          "status": true,
          "message": "success",
          "data": rest
     });
  next();
};

exports.getRestByCityId = async function (req, res, next) {
    const rest = await Restaurant.find({city:req.params.cityId}).select('-city -comment');
    if(!rest) return res.status(404).send('Not found check your id ');
     res.status(200).json({
          "status": true,
          "message": "success",
          "data": rest
     });
    next();
}
    

exports.postRest= async function(req,res,next){
    const {error}= validateRestaurant(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let rest = await Restaurant.findOne({name: req.body.name , lat:req.body.lat,lng:req.body.lng});
    if(rest) return res.status(400).send('this restaurant is already here');
    rest = new Restaurant(_.pick(req.body,
        ['name','address','pic','menu','rate','workTime','cuisineType','city','lat','lng']));
    rest = await rest.save();
    res.send(rest);
    next();
}

exports.putRest= async function(req,res,next){
    let rest = await Restaurant.findById(req.params.id);
    if(!rest) return res.status(404).send('Not found check your id');
    const { error } = validateRestaurant(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    rest = await Restaurant.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            address:req.body.address,
            rate:req.body.rate,
            workTime:req.body.workTime,
            cuisineType:req.body.cuisineType,
            pic:req.body.pic,
            menu:req.body.menu,
            lat:req.body.lat,
            lng:req.body.lng,
            city:req.body.city
        }
    },{ new : true })

    rest = await rest.save();
    res.send(rest);

    next();
}

exports.deleteRest= async function (req,res,next){
    const rest = await Restaurant.findByIdAndRemove(req.params.id);
    if(!rest) return res.status(404).send('not found check your id')
    res.send(rest);
    next();
}

exports.addComment = async (req,res, next) => {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    const user = await User.findOne({_id:req.body.id});
  
    console.log(user);
    let  userName = function(){
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
  
  exports.getRestaurantComments = async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": restaurant.comment
    });
  }