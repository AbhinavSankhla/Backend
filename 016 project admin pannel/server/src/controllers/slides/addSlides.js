const Slider = require("../../models/slides/slides");

const addSlides = async(req,res) => {
    try{
        const sliderData = req.body;
        const files = req.file;

        if(req.file){
            //adding filename in thumbnail.
            sliderData.thumbnail = req.file.filename;
        }

        // console.log(sliderData); 
        const data = new Slider(sliderData);
        const response = await data.save();

        res.status(200).json({message : 'course added successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'});
    }
};
module.exports = addSlides;