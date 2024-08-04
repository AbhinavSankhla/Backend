
const express = require('express');
const { addTeam } = require('../../controllers/controller');
const teamMulterFile = require('../../middlewares/team/teamMulter');

const teamRoutes = express.Router();

teamRoutes.post('/add_team',teamMulterFile ,addTeam);

module.exports = teamRoutes;