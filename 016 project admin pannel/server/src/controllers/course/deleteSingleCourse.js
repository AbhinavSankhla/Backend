const Course = require("../../models/course/course");

const deleteSingleCourse = async(req,res) => {
    try{
        // console.log(req.params);
        const response = await Course.findByIdAndDelete(req.params);
        res.status(200).json({message : 'course deleted successfuly', data: response});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'internal serever error'});
    }
};

module.exports = deleteSingleCourse;