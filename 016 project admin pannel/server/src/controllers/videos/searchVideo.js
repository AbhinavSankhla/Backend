const Video = require("../../models/video/video");

const searchVideos = async(req,res)=>{
    try{
        console.log(req.params);
        const response = await Video.find({$or:[           
            {videotopic:{$regex: new RegExp(req.params.key)}},  //create pattern
            {videourl:{$regex: new RegExp(req.params.key)}},
            // {status:{$regex: new RegExp(req.params.key)}}
        ]});

        console.log(response);
        res.status(200).json({message: 'data fetched successfully', data:response});
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = searchVideos;