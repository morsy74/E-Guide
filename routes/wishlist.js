const express = require('express');
const route = express.Router();
const wishlist= require('../controller/wishlist');

route.post('/:id/Restaurant',wishlist.addRestaurantToWishlist); 
route.post('/:id/Cafes',wishlist.addCafeToWishlist); 
route.post('/:id/Bus',wishlist.addBusToWishlist); 
route.post('/:id/City',wishlist.addCityToWishlist);
route.post('/:id/Club',wishlist.addClubToWishlist);
route.post('/:id/Hotel',wishlist.addHotelToWishlist); 
route.post('/:id/TouristPlace',wishlist.addTouristPlaceToWishlist); 
route.post('/:id/Train',wishlist.addTrainToWishlist); 
route.delete('/WishList',wishlist.deleteFromWishlist); 

route.get('/:id/wishlist',wishlist.getWishlist); 

module.exports=route;