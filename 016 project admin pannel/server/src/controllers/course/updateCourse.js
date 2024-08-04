
const Course = require("../../models/course/course");
const fs = require('fs');
const path = require('path');

const updateCourse = async (req,res)=>{
    try{
        const data = req.body;

        if(req.file){
            data.thumbnail = req.file.filename;

            const {thumbnail} = await Course.findOne(req.params);

            if(thumbnail){
                const oldfilepath = path.join('src', 'uploads', thumbnail);
                if(fs.existsSync(oldfilepath)){
                    fs.unlinkSync(oldfilepath);
                }
            }           
        };

        const response = await Course.findOneAndUpdate(
            req.params,
            {
                $set: data
            }
        );

        res.status(200).json({message: 'data updated successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
};

module.exports = updateCourse;