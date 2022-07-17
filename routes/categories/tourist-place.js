const express = require('express');
const router = express.Router();
const touristController = require('../../controller/categories/touristController');
//const auth = require('../../middleware/auth');
//const admin = require('../../middleware/admin');

router.post('/addTouristPlace',touristController.addTourist);
router.put('/editTouristPlace/:id',  touristController.editTourist);
router.delete('/deleteTouristPlace/:id', touristController.deleteTourist);
router.get('/showAllTouristPlaces', touristController.showAllTourists);
router.post('/:touristId',touristController.addComment);
router.get('/comments/:touristId',touristController.getTouristComments);
router.post('/:id/review',touristController.addTouristReview);

module.exports = router;