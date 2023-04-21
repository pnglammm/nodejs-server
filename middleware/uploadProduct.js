const path = require('path');
const multer =  require('multer');
const cloudinary = require('cloudinary').v2;
// add product
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/productsImage') //Đường dẫn hình khi tạo sản phẩm 
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, "PK02586_" + Date.now() + ext);
    }
})

var upload = multer ({
    storage: multer.diskStorage({}),
    fileFilter: (req,  file, callback) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp"){
            callback(null, true);
        }else{
            console.log("Only jpg & png & jpeg & webp file supported");
            callback(null, false);
        }
    },
    limits: {
        fieldSize: 1024 * 1024 * 2
    }
})
module.exports = upload