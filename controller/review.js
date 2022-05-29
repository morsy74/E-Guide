const {Review}= require('../models/review'); 
const{Restaurant}= require('../models/categories/restaurant');
const {User}= require('../models/user/user');

exports.addReviewsInRestaurant= async (req,res,next)=>{
    let user = await User.findById(req.params.id);
    console.log(user);
    if(!user)return res.json({
        status:"true",
        message:"can't send review you must login"
    });
    let reviews=Review.findOne({ Restaurants: req.body.id })
    //console.log(reviews);
    if(reviews) return res.send('cannot send again');
    
    let review=new Review({
        UserId: req.params.id,
        Restaurants:req.body.Restaurants,
        comment:req.body.comment,
        rate:req.body.rate
    });
    
    review= await review.save();
    
    res.status(200).json({
        status:"true",
        message:"success",
        data:review
    });
    

}