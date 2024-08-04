const Team = require("../../models/team/team");

const addTeam = async(req,res) => {
    try{
        const teamData = req.body;
        // const files = req.file;

        if(req.file){
            teamData.thumbnail = req.file.filename;
        }
        console.log(teamData); 

        const data = new Team(teamData);
        const response = await data.save();

        res.status(200).json({message : 'team member added successfully', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message : 'internal server error'});
    }
};
module.exports = addTeam;