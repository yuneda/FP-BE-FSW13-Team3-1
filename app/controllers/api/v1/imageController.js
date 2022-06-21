const upload = require('../../../middlewares/upload')
const cloudinary = require('../../../middlewares/cloudinary')

module.exports = {
  upload(req, res, next) {
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, function (err, result) {
      if (!!err) {
        console.log(err);
        return res.status(400).json({
          message: "Gagal upload file!",
        });
      }
      req.body.image = result.url
      next()

      // res.status(201).json({
      //   message: "Upload image berhasil",
      //   url: result.url,
      // });
    });
  },

};