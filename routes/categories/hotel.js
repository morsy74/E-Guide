const express = require('express');
const router = express.Router();
const hotelController = require('../../controller/categories/hotelController');
const {auth} = require('../../middleware/auth');
//const admin = require('../../middleware/admin');

router.post('/addHotel',  hotelController.addHotel);
router.put('/editHotel/:id', hotelController.editHotel);
router.delete('/deleteHotel/:id', hotelController.deleteHotel);
router.get('/showAllHotels', hotelController.showAllHotels);
router.post('/:hotelId',hotelController.addComment);
router.get('/comments/:clubId',hotelController.getHotelComments);
router.post('/:id/review',hotelController.addHotelReview);
router.post('/booking/:id',auth,hotelController.booking);

module.exports = router;