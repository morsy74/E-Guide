const express = require('express');
const router = express.Router();
const clubController = require('../../controller/categories/clubController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.post('/addClub', auth, clubController.addClub);
router.put('/editClub/:id', auth, clubController.editClub);
router.delete('/deleteClub/:id', [auth, admin], clubController.deleteClub);
router.get('/showAllClubs', clubController.showAllClubs);
router.post('/:clubId',clubController.addComment);
router.get('/comments/:clubId',clubController.getClubComments);

module.exports = router;