const multer = require('multer');
const path = require('path');

// Menentukan tempat penyimpanan file
const publicDirectory = path.join(__dirname, 'public');
const uploadDirectory = path.join(publicDirectory, 'uploads');

// Mendefinisikan gimana cara nyimpen file-nya
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDirectory);
  },

  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
    );
  },
});

// Membuat upload middleware
module.exports = multer({ storage });
