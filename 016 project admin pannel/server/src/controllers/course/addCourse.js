const Course = require("../../models/course/course");

const addCourse = async(req,res) => {
    try{
        const courseData = req.body;
        
        // const files = req.file;  //for multiple file (req.files) 

        //Send file (compulsory condition) 
        if(req.file){
            //add new key name 'thumbnail' in courseData
            courseData.thumbnail = req.file.filename;
        }
        
        // console.log(courseData); 

        const data = new Course(courseData); //import model(Course) & pass obj(courseData)
        
        const responce = await data.save();
        
        res.status(200).json({message : 'course added successfully', data: responce});
    }

    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'});
    }
};

module.exports = addCourse;