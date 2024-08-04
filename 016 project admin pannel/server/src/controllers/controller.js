
//admin controllers
const adminLogin = require('./admin/adminLogin');
const registerAdmin = require('./admin/registerAdmin');

//course controllers
const addCourse = require('./course/addCourse');
const changeStatus = require('./course/changeStatus');
const deleteMultipleCourse = require('./course/deleteMultipleCourse');
const updateCourse = require('./course/updateCourse');
const deleteSingleCourse = require('./course/deleteSingleCourse');
const readCourse = require('./course/readCourse');
const readSingleCourse = require('./course/readSingleCourse');
const trueCourses = require('./course/trueCourses');

//videos controllers
const addVideo = require('./videos/addVideo');
const readVideos = require('./videos/readVideos');
const changeVideoStatus = require('./videos/changeVideoStatus');
const readSingleVideo = require('./videos/readSingleVideo');
const deleteSingleVideo = require('./videos/deleteSingleVideo');
const deleteMultipleVideo = require('./videos/deleteMultipleVideo');


//slide controllers
const addSlides = require('./slides/addSlides');


const otpGenrator = require('./otp/otpGenerator');
const registerUser = require('./user/registerUser');

//team controllers
const addTeam = require('./team/addTeam');




module.exports = {
    registerAdmin,
    adminLogin,
    addCourse,
    readCourse,
    changeStatus,
    updateCourse,
    readSingleCourse,
    deleteSingleCourse,
    deleteMultipleCourse,
    trueCourses,
    addVideo,
    addSlides,
    otpGenrator,
    registerUser,
    readVideos,
    changeVideoStatus,
    readSingleVideo,
    deleteSingleVideo,
    deleteMultipleVideo,
    addTeam
}

