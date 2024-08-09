const Team = require("../../models/team/team");

const deleteSingleMember = async(req,res) => {
    try{
        // console.log(req.params);
        const response = await Team.findByIdAndDelete(req.params);
        res.status(200).json({message : 'course deleted successfuly', data: response});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'internal serever error'});
    }
};

module.exports = deleteSingleMember;