const express =require('express');
const productRoutes = require('./routes/products/productsRoutes');
require('./db/config');

const allRoutes = express.Router();

allRoutes.use('/product', productRoutes);

module.exports = allRoutes;

