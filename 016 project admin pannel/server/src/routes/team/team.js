const express = require('express');

const {addTeam, 
    readTeam, 
    changeMemberStatus,
    readSingleTeam,
    deleteSingleMember,
    deleteMultipleMember,
    searchTeamMember} = require('../../controllers/controller');

const teamMulterFile = require('../../middlewares/team/teamMulter');

const teamRoutes = express.Router();

teamRoutes.post('/add_team',teamMulterFile ,addTeam);
teamRoutes.get('/read_team', readTeam);
teamRoutes.put('/change_status', changeMemberStatus);
teamRoutes.get('/fetch_team_with_id/:_id', readSingleTeam);
teamRoutes.delete('/delete_single_member/:_id', deleteSingleMember);
teamRoutes.delete('/delete_multiple_member', deleteMultipleMember);
teamRoutes.get('/search_team_member/:key', searchTeamMember);



module.exports = teamRoutes;