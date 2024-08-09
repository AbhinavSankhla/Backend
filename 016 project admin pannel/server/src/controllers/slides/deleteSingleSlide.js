const Slider = require("../../models/slides/slides");

const deleteSingleSlide = async(req,res) => {
    try{
        // console.log(req.params);
        const response = await Slider.findByIdAndDelete(req.params);
        res.status(200).json({message : 'course deleted successfuly', data: response});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'internal serever error'});
    }
};

module.exports = deleteSingleSlide;