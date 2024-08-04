
const express = require('express');
const { registerUser } = require('../../controllers/controller');

const userRouter = express.Router();

userRouter.post('/register_user', registerUser);

module.exports = userRouter;