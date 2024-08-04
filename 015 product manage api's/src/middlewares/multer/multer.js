const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'src/uploads');
    },
    filename:function(req,file,cb){
        const newName = Date.now() + file.originalname;
        cb(null, newName);
    }
});

const upload = multer({storage:multerStorage}).fields([
    {name : 'thumbnail', maxCount: 1},
    {name : 'images', maxCount: 10}
])

module.exports = upload;