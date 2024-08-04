const Course = require("../../models/course/course");

const changeStatus = async(req,res) =>{
    try{
        const response = await Course.updateOne(
            {
                _id: req.body.id
            },
            {
                $set: {
                    //key name taken from models folder file. 
                    status: req.body.status, 
                    updated_at: Date.now()  
                }
            }
        );
        // console.log(req.body);
        res.status(200).json({message: 'status updated successfully', data: response});
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = changeStatus;
