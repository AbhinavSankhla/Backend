
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
const searchCourses = require('./course/searchCourses');

//videos controllers
const addVideo = require('./videos/addVideo');
const readVideos = require('./videos/readVideos');
const changeVideoStatus = require('./videos/changeVideoStatus');
const readSingleVideo = require('./videos/readSingleVideo');
const deleteSingleVideo = require('./videos/deleteSingleVideo');
const deleteMultipleVideo = require('./videos/deleteMultipleVideo');
const searchVideos = require('./videos/searchVideo');


//slide controllers
const addSlides = require('./slides/addSlides');
const readSlide = require('./slides/readSlides');
const changeSliderStatus = require('./slides/changeStatus');
const readSingleSlide = require('./slides/readSingleSlide');
const deleteSingleSlide = require('./slides/deleteSingleSlide');
const deleteMultipleSlide = require('./slides/deleteMultipleSlides');
const searchSlider = require('./slides/searchSlide');


//Educational Website
const otpGenrator = require('./otp/otpGenerator');
const registerUser = require('./user/registerUser');

//team controllers
const addTeam = require('./team/addTeam');
const readTeam = require('./team/readTeam');
const changeMemberStatus = require('./team/changeStatus');
const readSingleTeam = require('./team/readSingleTeam');
const deleteSingleMember = require('./team/deleteSingleMember');
const deleteMultipleMember = require('./team/deleteMultipleMember');
const searchTeamMember = require('./team/searchteam');

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
    searchCourses,
    addVideo,
    addSlides,
    readSlide,
    changeSliderStatus,
    readSingleSlide,
    deleteSingleSlide,
    deleteMultipleSlide,
    searchSlider,
    otpGenrator,
    registerUser,
    readVideos,
    changeVideoStatus,
    readSingleVideo,
    deleteSingleVideo,
    deleteMultipleVideo,
    addTeam,
    readTeam,
    changeMemberStatus,
    readSingleTeam,
    deleteSingleMember,
    deleteMultipleMember,
    searchTeamMember,
    searchVideos
}

