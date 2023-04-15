const path = require('path');
const multer =  require('multer');
// add product
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/productsImage') //Đường dẫn hình khi tạo sản phẩm 
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

var upload = multer ({
    storage: storage,
    fileFilter: (req,  file, callback) => {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/webp"){
            callback(null, true);
        }else{
            console.log("Only jpg & png file supported");
            callback(null, false);
        }
    },
    limits: {
        fieldSize: 1024 * 1024 * 2
    }
})
module.exports = upload