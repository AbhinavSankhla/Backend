const Course = require("../../models/course/course");

const searchCourses = async(req,res)=>{
    try{
        // console.log(req.params);
        const response = await Course.find({$or:[
            // {coursename:{$regex: req.params.key}}, //without pattern serach only string typed
           
            {coursename:{$regex: new RegExp(req.params.key)}},  //create pattern
            // {courseprice:{$regex: new RegExp(Number(req.params.key))}},
            {courseduration:{$regex: new RegExp(req.params.key)}},
            {coursedes:{$regex: new RegExp(req.params.key)}},
            // {status:{$regex: new RegExp(req.params.key)}}
        ]});

        // console.log(response);
        res.status(200).json({message: 'data fetched successfully', data:response});
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = searchCourses;