const express = require('express');
const route = express.Router();
const wishlist= require('../controller/wishlist');
const{auth}=require('../middleware/auth')

route.post('/Restaurant',auth,wishlist.addRestaurantToWishlist); 
route.post('/Club',auth,wishlist.addClubToWishlist);
route.post('/Hotel',auth,wishlist.addHotelToWishlist); 
route.post('/TouristPlace',auth,wishlist.addTouristPlaceToWishlist); 
route.delete('/WishList',auth,wishlist.deleteFromWishlist); 
route.get('/wishlist',auth,wishlist.getWishlist); 
route.post('/Cafes',auth,wishlist.addCafeToWishlist); 

//route.post('/Train',auth,wishlist.addTrainToWishlist); 
//route.post('/Bus',auth,wishlist.addBusToWishlist); 
//route.post('/City',auth,wishlist.addCityToWishlist);

module.exports=route;