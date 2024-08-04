const express = require('express');
const { otpGenrator } = require('../../controllers/controller');

const otpRouter = express.Router();

otpRouter.post('/generate_otp', otpGenrator);

module.exports = otpRouter;