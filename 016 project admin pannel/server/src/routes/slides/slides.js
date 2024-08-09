const express = require('express');
const { addSlides, 
    readSlide, 
    changeSliderStatus,
    readSingleSlide,
    deleteSingleSlide,
    deleteMultipleSlide,
    searchSlider} = require('../../controllers/controller');

const slideMulterFile = require('../../middlewares/slides/slideMulter');

const slidesRoutes = express.Router();

slidesRoutes.post('/add_slides', slideMulterFile ,addSlides);
slidesRoutes.get('/read_slides', readSlide);
slidesRoutes.put('/change_slide_status', changeSliderStatus);
slidesRoutes.get('/fetch_slide_with_id/:_id', readSingleSlide);
slidesRoutes.delete('/delete_single_slide/:_id', deleteSingleSlide);
slidesRoutes.delete('/delete_multiple_slide', deleteMultipleSlide);
slidesRoutes.get('/search_slide/:key', searchSlider);


module.exports = slidesRoutes;