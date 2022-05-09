const express = require('express');
const router = express.Router();
const touristController = require('../../controller/categories/touristController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.post('/addTouristPlace', auth, touristController.addTourist);
router.put('/editTouristPlace/:id', auth, touristController.editTourist);
router.delete('/deleteTouristPlace/:id', [auth, admin], touristController.deleteTourist);
router.get('/showAllTouristPlaces', touristController.showAllTourists);
router.post('/:touristId',touristController.addComment);
router.get('/comments/:touristId',touristController.getTouristComments);

module.exports = router;