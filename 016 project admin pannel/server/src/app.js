const express = require('express');
const adminRoutes = require('./routes/admin/adminroutes');
const courseRoutes = require('./routes/course/course');
const videoRoutes = require('./routes/video/videoRoutes');
const slidesRoutes = require('./routes/slides/slides');
const otpRouter = require('./routes/otp/otp');
const userRouter = require('./routes/users/users');
const teamRoutes = require('./routes/team/team');

require('./db/config');

const allRoutes = express.Router();

allRoutes.use('/admin', adminRoutes);
allRoutes.use('/course', courseRoutes);
allRoutes.use('/videos', videoRoutes);
allRoutes.use('/slides', slidesRoutes );
allRoutes.use('/team', teamRoutes);
allRoutes.use('/otp', otpRouter);
allRoutes.use('/user', userRouter);

module.exports = allRoutes;