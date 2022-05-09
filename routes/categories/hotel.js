const express = require('express');
const router = express.Router();
const hotelController = require('../../controller/categories/hotelController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.post('/addHotel', auth, hotelController.addHotel);
router.put('/editHotel/:id', auth, hotelController.editHotel);
router.delete('/deleteHotel/:id', [auth, admin], hotelController.deleteHotel);
router.get('/showAllHotels', hotelController.showAllHotels);
router.post('/:hotelId',hotelController.addComment);
router.get('/comments/:clubId',hotelController.getHotelComments);

module.exports = router;