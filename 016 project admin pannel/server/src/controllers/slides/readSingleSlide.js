const Slider = require("../../models/slides/slides");

const readSingleSlide = async (req,res)=>{
    try{
        const response = await Slider.findOne(req.params);

        // response.thumbnail = `${req.protocol}://${req.get('host')}/uploads/${response.thumbnail}`;

        if(!response) return res.status(404).json({message: 'data not found'});
        res.status(200).json({message:'data fetched successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = readSingleSlide;