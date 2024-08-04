// const Video = require("../../models/video/video");

const addVideo = async(req,res) =>{
    try{
        console.log(req.body);
        // const data = new Video(req.body);
        // const response = await data.save();

        res.status(200).json({message: 'data inserted successfully'});

    }catch(error){
        res.status(500).json({message: 'internal sever error'});
    }
}

module.exports = addVideo;