const express = require('express');
const router = express.Router();
const clubController = require('../../controller/categories/clubController');
//const auth = require('../../middleware/auth');
//const admin = require('../../middleware/admin');

router.post('/addClub',  clubController.addClub);
router.put('/editClub/:id',  clubController.editClub);
router.delete('/deleteClub/:id', clubController.deleteClub);
router.get('/showAllClubs', clubController.showAllClubs);
router.post('/:clubId',clubController.addComment);
router.get('/comments/:clubId',clubController.getClubComments);
router.post('/addRate/:clubId',clubController.addRate);
router.post('/:id/review',clubController.addClubReview);
module.exports = router;