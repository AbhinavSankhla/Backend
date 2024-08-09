const Team = require("../../models/team/team");

const changeMemberStatus = async(req, res) =>{
    try{
        const response = await Team.updateOne(
            {
                _id : req.body.id
            },
            {
                $set: {
                    status: req.body.status
                }
            }
        )
        // console.log(req.body);
        res.status(200).json({message : 'status updated successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'});
    }
}
module.exports= changeMemberStatus;