
const express = require('express');
const { addSlides } = require('../../controllers/controller');
const slideMulterFile = require('../../middlewares/slides/slideMulter');

const slidesRoutes = express.Router();

slidesRoutes.post('/add_slides', slideMulterFile ,addSlides);

module.exports = slidesRoutes;