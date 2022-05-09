const cafe = require('../../controller/categories/cafe')
const express = require('express');
const router = express.Router();

router.get('/getCafes',cafe.getCafe);
router.get('/getCafeById/:id',cafe.getCafeById);
router.get('/city/:cityId',cafe.getCafeByCityId);
router.post('/',cafe.creatCafe);
router.put('/:id',cafe.updateCafe);
router.delete('/:id',cafe.deleteCafe);
router.post('/:cafeId',cafe.addComment);
router.get('/comments/:cafeId',cafe.getCafeComments);

module.exports=router;