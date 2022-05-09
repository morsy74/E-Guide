const city = require('../../controller/categories/city');
const express= require('express');
const router=express.Router();
router.get('/getCities',city.getCity);
router.get('/getCityById/:id',city.getCityById);
router.post('/',city.creatCity);
router.put('/:id',city.editCity);
router.delete('/:id',city.deleteCity);
router.post('/:cityId',city.addComment);
router.get('/comments/:cityId',city.getCityComments);
module.exports=router;

