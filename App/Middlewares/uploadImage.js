const multer = require('multer')
const path = require('path');
const allowedMimeTypes = ['image/jpeg', 'image/png'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    
  },
})
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb( new Error('Invalid file type, only JPEG and PNG are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter })

module.exports = upload;