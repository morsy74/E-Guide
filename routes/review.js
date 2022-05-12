const express= require('express');
const routes= express.Router();
const review= require('../controller/review');

routes.post('/review/:id',review.addReviewsInRestaurant);

module.exports=routes;
