const { FailedUploadFileError } = require('../../../errors');

const { dataUri } = require('../../../middlewares/multerUpload');
const {
  uploader,
  cloudinaryConfig,
} = require('../../../middlewares/cloudinary');

module.exports = {
  upload(req, res, next) {
    const fileBase64 = req.file.buffer.toString('base64');
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    cloudinaryConfig();

    if (!req.file.mimetype.includes('image')) {
      return res.status(400).json({
        message: 'Wrong image format!',
      });
    }

    uploader.upload(file, (err, result) => {
      if (err) {
        const error = new FailedUploadFileError();
        return res.status(400).json(error);
      }
      req.body.image = result.url;
      next();
    });
  },

  async multerUploads(req, res, next) {
    try {
      if (req.files && req.files.length) {
        cloudinaryConfig();
        const promises = req.files.map((file) => {
          const base64File = dataUri(file).content;
          return uploader.upload(base64File);
        });

        const uploadedFiles = await Promise.all(promises);
        const urls = uploadedFiles.map((file) => file.url);
        req.body.image = urls;
        next();
        // return res.status(201).json({ urls });
      }
    } catch (err) {
      return res.status(500).send('oopsie');
    }
  },
};
