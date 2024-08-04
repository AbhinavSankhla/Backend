const Video = require("../../models/video/video");

const readSingleVideo = async (req,res) =>{
    try{
        const response = await Video.findOne(req.params);

        if (!response) return res.status(404).json({message: 'data not found'});
        res.status(200).json({message : 'data fetched successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal sever error'});
        
    }
}

module.exports = readSingleVideo;