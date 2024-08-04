const Course = require("../../models/course/course");

const trueCourses = async(req,res) =>{
    try{
        const courses = await Course.find({status: true});
        const filePath = `${req.protocol}://${req.get('host')}/uploads/`;
        res.status(200).json({message : 'data fetched successfully', data: courses,filePath });   
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'});
    }
}

module.exports = trueCourses;

