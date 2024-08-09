const Team = require("../../models/team/team");

const searchTeamMember = async(req,res)=>{
    try{
        // console.log(req.params);
        const response = await Team.find({$or:[
            {memberName:{$regex: new RegExp(req.params.key)}}, 
            {memberCat:{$regex: new RegExp(req.params.key)}}
        ]});

        res.status(200).json({message: 'data fetched successfully', data:response});
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message: 'internal server error'});
    }
};

module.exports = searchTeamMember;