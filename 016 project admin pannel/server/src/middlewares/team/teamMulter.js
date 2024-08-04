
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/team');
    },
    filename:(req,file,cb)=>{
        const nameArr = file.originalname.split('.');

        cb(null, Date.now() + '.' + nameArr[nameArr.length - 1]);
    }
});

const teamMulterFile = multer({storage: storage}).single('thumbnail');

module.exports = teamMulterFile;