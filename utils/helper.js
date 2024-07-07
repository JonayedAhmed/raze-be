const upload = require('../config/multerConfig');

// Helper function to handle file upload with multer and return a promise
const uploadSingle = (fieldName) => (req, res) => {
    return new Promise((resolve, reject) => {
        upload.single(fieldName)(req, res, (err) => {
            if (err) return reject(err);
            resolve(req.file);
        });
    });
};

module.exports = { uploadSingle };
