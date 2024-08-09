const express = require('express');
const { addVideo, 
    readVideos, 
    changeVideoStatus,
    readSingleVideo,
    deleteSingleVideo,
    deleteMultipleVideo,
    searchVideos} = require('../../controllers/controller');

const videoRoutes = express.Router();

videoRoutes.post('/add_video', addVideo);
videoRoutes.get('/read_video', readVideos);
videoRoutes.put('/change_video_status', changeVideoStatus);
videoRoutes.get('/fetch_video_with_id/:_id', readSingleVideo);
videoRoutes.delete('/delete_single_video/:_id', deleteSingleVideo);
videoRoutes.delete('/multi_delete_video', deleteMultipleVideo);
videoRoutes.get('/search_video/:key', searchVideos);

module.exports = videoRoutes;