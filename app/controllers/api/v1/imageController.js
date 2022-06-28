const { FailedUploadFileError } = require("../../../errors");

const { dataUri } = require("../../../middlewares/multerUpload");
const { uploader, cloudinaryConfig } = require("../../../middlewares/cloudinary");

module.exports = {
  upload(req, res, next) {
    console.log('masuk')
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    cloudinaryConfig();

    if (!req.file.mimetype.includes("image")) {
      return res.status(400).json({
        message: "Wrong image format!",
      });
    }

    uploader.upload(file, function (err, result) {
      console.log('masu2k')
      if (!!err) {
        console.log('masu2k')
        console.log(err);
        const error = new FailedUploadFileError();
        return res.status(400).json(error);
      }
      console.log(result)
      req.body.image = result.url
      console.log(req.body.image)
      next()

      // res.status(201).json({
      //   message: "Upload image berhasil",
      //   url: result.url,
      // });
    });
  },

  async multerUploads(req, res, next) {
    try {
      console.log(req.url)
      if (req.files && req.files.length) {
        cloudinaryConfig();
        const promises = req.files.map(file => {
          const base64File = dataUri(file).content;
          return uploader.upload(base64File);
        });

        const uploadedFiles = await Promise.all(promises);
        const urls = uploadedFiles.map(file => file.url);
        req.body.image = urls;
        next();
        // return res.status(201).json({ urls });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("oopsie");
    }
  }

};