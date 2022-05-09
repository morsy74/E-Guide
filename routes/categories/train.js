const train = require('../../controller/categories/train')
const express = require('express');
const router = express.Router();

router.get('/getTrainStations',train.getTrain);
router.get('/getTrainStationsById/:id',train.getTrainById);
router.get('/city/:cityId',train.getTrainByCityId);
router.post('/',train.creatTrain);
router.put('/:id',train.updateTrain);
router.delete('/:id',train.deleteTrain);
router.post('/:trainId',train.addComment);
router.get('/comments/:trainId',train.getTrainComments);

module.exports=router;