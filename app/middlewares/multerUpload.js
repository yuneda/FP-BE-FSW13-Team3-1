const path = require('path');
const multer = require('multer');
const Datauri = require('datauri');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).any('files');

const dUri = new Datauri();

const dataUri = (file) => dUri.format(path.extname(file.originalname).toString(), file.buffer);

module.exports = { multerUploads, dataUri };
