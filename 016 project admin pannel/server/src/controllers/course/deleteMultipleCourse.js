const Course = require("../../models/course/course");
const fs = require('fs');
const path = require('path');

const deleteMultipleCourse = async(req,res) => {
    try{
        // console.log(req.body);
        const oldData = await Course.find({_id: {$in: req.body}}); //find checked array 
        // console.log(oldData);

        oldData.forEach((item) => {
            if(item.thumbnail){
                const oldfilepath = path.join('src', 'uploads', item.thumbnail);
                //path check and if exist then delete
                if(fs.existsSync(oldfilepath)){  
                    fs.unlinkSync(oldfilepath);
                }
            } 
        });

        const response = await Course.deleteMany({_id:{$in: req.body}});

        res.status(200).json({messsage: 'data deleted successfully', data: response});

    }catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = deleteMultipleCourse;

