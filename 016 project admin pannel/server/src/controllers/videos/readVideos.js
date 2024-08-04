const Video = require("../../models/video/video");

const readVideos = async(req,res) =>{
    try{
        const response = await Video.find().populate('coursecat'); //populate gives complete data of foreign key (gives coursecat complete data(obj) in this case)
        //here coursecat is key of another collection which save as foriegn key. so populate fetch data of that collection.

        res.status(200).json({message : 'data fetched successfully', data : response})
    }
    catch(error){
        res.status(500).json({message : 'something went wrong'});
    }
};

module.exports = readVideos;

// note- 
// viewcourse>coursename - item.coursecat.coursename
