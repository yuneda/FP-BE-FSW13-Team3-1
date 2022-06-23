const upload = require('../../../middlewares/upload')
const cloudinary = require('../../../middlewares/cloudinary')
const { FailedUploadFileError} = require("../../../errors");

module.exports = {
  upload(req, res, next) {    
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    console.log(req.file)

    if(!req.file.mimetype.includes("image")) {
          return res.status(400).json({
          message: "Wrong image format!",
        });
    }
  
    cloudinary.uploader.upload(file, function (err, result) {
      if (!!err) {
        console.log(err);
        const eerr = new FailedUploadFileError();      
        return res.status(400).json(eerr);        
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