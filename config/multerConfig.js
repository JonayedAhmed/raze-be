const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Ensure upload directories exist
        // TODO: code below is not working, need to update check and create existing directory
        /*
        const userImagesDir = path.join(__dirname, 'uploads/userImages');
        const productImagesDir = path.join(__dirname, 'uploads/productImages');
        const bannersDir = path.join(__dirname, 'uploads/banners');

        if (!fs.existsSync(userImagesDir)) {
            fs.mkdirSync(userImagesDir, { recursive: true });
        }

        if (!fs.existsSync(productImagesDir)) {
            fs.mkdirSync(productImagesDir, { recursive: true });
        }

        if (!fs.existsSync(bannersDir)) {
            fs.mkdirSync(bannersDir, { recursive: true });
        }
            */

        // Set upload path
        let uploadPath = 'uploads/';
        if (file.fieldname === 'userImage') {
            uploadPath += 'userImages/';
        } else if (file.fieldname === 'productImage') {
            uploadPath += 'productImages/';
        } else if (file.fieldname === 'banner') {
            uploadPath += 'banners/';
        }
        cb(null, uploadPath); // Set the destination folder dynamically
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`); // Set the filename
    }
});

// Filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: fileFilter
});

module.exports = upload;
