
const insertProduct = async(req,res) => {
    try{
        const {name, description, price, mrp} = req.body;

        const thumbnail = req.files.thumbnail[0].filename;

        const images = req.files.images.map((imgData) => {
            return imgData.filename;
        });

        const filesData = req.files;

        // console.log(filesData);
        res.status(200).json('product inserted');
    }
    catch(error){
        console.log(error)
        res.status(500).json('internal server error');
    }
};

module.exports = insertProduct;