const Slider = require("../../models/slides/slides");

const searchSlider = async(req,res)=>{
    try{
        const response = await Slider.find({$or:[

            {sliderHeading:{$regex: new RegExp(req.params.key)}},  //create pattern
            {sliderSubHeading:{$regex: new RegExp(req.params.key)}},  //create pattern
            // {courseprice:{$regex: new RegExp(Number(req.params.key))}},
            {sliderDes:{$regex: new RegExp(req.params.key)}},
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

module.exports = searchSlider;