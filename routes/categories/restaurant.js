const rest = require('../../controller/categories/restaurant');
const express= require('express');
const router=express.Router();
const{auth}=require('../../middleware/auth')
const{owner}=require('../../middleware/owner');
const {admin} = require('../../middleware/admin');
router.get('/getRestaurants',rest.getRest);
router.get('/getRestaurantById/:id',rest.getRestById);
router.get('/city/:cityId',rest.getRestByCityId);
router.post('/:restaurantId',auth,rest.addComment);
router.post('/:id/review',auth,rest.addReview);
router.delete('/:id/review',auth,rest.deleteReviewFromRestaurant);
router.post('/booking/:id',auth,rest.booking);
//router.get('/comments/:restaurantId',rest.getRestaurantComments);

//owner
router.post('/',owner,rest.postRest);
router.put('/:id',owner,rest.putRest);
router.delete('/:id',owner,rest.deleteRest);

//admin
router.post('/admin',[auth, admin],rest.postRest);
router.put('/admin/:id',[auth, admin],rest.putRest);
router.delete('/admin/:id', [auth, admin], rest.deleteRest);


module.exports=router;
