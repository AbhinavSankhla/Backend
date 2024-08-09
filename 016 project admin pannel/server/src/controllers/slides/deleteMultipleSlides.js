const Slider = require("../../models/slides/slides");
const fs = require('fs');
const path = require('path');

const deleteMultipleSlide = async(req,res) =>{
    try{
        // console.log(req.body);
        const oldData = await Slider.find({_id: {$in: req.body}});

        oldData.forEach((item) => {
            if(item.thumbnail){
                const oldfilepath = path.join('src', 'uploads', item.thumbnail);
                //path check and if exist then delete
                if(fs.existsSync(oldfilepath)){  
                    fs.unlinkSync(oldfilepath);
                }
            } 
        });

        const response = await Slider.deleteMany({_id:{$in: req.body}});

        res.status(200).json({messsage: 'data deleted successfully', data: response});
           
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'});
    }
}

module.exports = deleteMultipleSlide;