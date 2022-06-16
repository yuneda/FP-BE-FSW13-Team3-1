// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "gg-team", // TODO: Ganti dengan cloudname-mu
  api_key: "834599295912568", // TODO: Ganti dengan API Key-mu
  api_secret: "qzB1fBhCM3wQRMGzD6bkAWx_LlU", // TODO: Ganti dengan API Secret-mu
  secure: true,
});

module.exports = cloudinary;

