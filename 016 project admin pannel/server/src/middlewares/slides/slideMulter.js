
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename:(req,file,cb)=>{
        const nameArr = file.originalname.split('.');

        cb(null, Date.now() + '.' + nameArr[nameArr.length - 1]);
    }
});

const slideMulterFile = multer({storage: storage}).single('thumbnail');

module.exports = slideMulterFile;