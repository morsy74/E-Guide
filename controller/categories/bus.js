const {Bus , validateBus}= require('../../models/categories/bus');
const {User}= require('../../models/user/user');
const _ = require('lodash');

exports.creatBus=async function (req,res,next){
    const{error}= validateBus(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let bus = await Bus.findOne({name: req.body.name});//,lng:req.body.lng,lat:req.body.lat
    if(bus) return res.status(400).send("this cafe already in data base");
    bus = await new Bus(_.pick(req.body,['name','address','pic','rate','workTime','city','lat','lng']));
    bus = await bus.save();
    res.send(bus);
    next(); 
}

exports.getBus= async function(req,res,next){

    let filter = {};
    if(req.query.rate){
        filter = {rate: req.query.rate };
    }
    const bus = await Bus.find(filter).populate('city','name -_id').select("-comment");
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": bus
    });
    next();
}

exports.getBusById= async function(req,res,next){
    const bus = await Bus.findById(req.params.id).populate('city','name -_id').select("-comment");
    if(!bus) return res.status(404).send('Not found check your id ');
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": bus
    });
    next();
}

exports.getBusByCityId = async function (req, res, next) {
    const bus = await Bus.find({ city: req.params.cityId }).select('-city -comment');
    if (!bus) return res.status(404).send('Not found check your id ');
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": bus
    });
    next();
}

exports.updateBus= async function(req,res,next){
    let bus= await Bus.findById(req.params.id);
    if(!bus)return res.status(404).send('not found check your id ');
    
    const {error}= validateBus(req.body);
    if(error)return res.status(400).send(error.details[0].message);
    
    bus = await Bus.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
            address:req.body.address,
            pic:req.body.pic,
            price:req.body.price,
            lat:req.body.lat,
            lng:req.body.lng,
            city:req.body.city
        }
    }, {new : true})

    bus = await bus.save();
    res.send(bus);
}


exports.deleteBus = async function(req,res,next){
    const bus = await Bus.findByIdAndRemove(req.params.id);
    if(!bus) return res.status(404).send('not found check id');
    res.send(bus);
    next();
}

exports.addComment = async (req,res, next) => {
    const bus = await Bus.findById(req.params.busId);
    const user = await User.findOne({_id:req.body.id});

    console.log(user);
    let  userName = function(){
        let localName = user.local.name;
        if (localName == null) return user.google.name;
        else return localName
    }
    
    let comment = bus.comment;
    comment.push({
        "name": userName(),
        "text": req.body.text
    })

    await bus.save();
    // res.send(comment);

    res.status(200).json({
        "status": true,
        "message": "Your comment in sent successfully",
        "data": comment
    });
}

exports.getBusComments = async (req, res, next) => {
    const bus = await Bus.findById(req.params.busId);
    res.status(200).json({
        "status": true,
        "message": "success",
        "data": bus.comment
    });
}