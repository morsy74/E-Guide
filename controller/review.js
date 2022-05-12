const {Review}= require('../models/review'); 
const {User}= require('../models/user/user');

exports.addReviewsInRestaurant= async (req,res,next)=>{
    let user = await User.findById(req.params.id);
    if(!user)return res.json({
        status:"true",
        message:"can't send review you must login"
    });

    let Restaurant = await Review.findById (req.body.id)
    if(!Restaurant)return res.json({
        status:"true",
        message:"YOU CAN'T COMMENT AGAIN"
    });
    let Reviews = new Review({
        UserId:req.params.id,
       Restaurants:req.body.id,
        ratings:req.body.rate,
    });

    Reviews= await Reviews.save();

    res.status(200).json({
        status:"true",
        message:"can't send review you must login",
        data:Reviews
    });
    

}