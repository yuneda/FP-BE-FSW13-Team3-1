// Require the Cloudinary library
require('dotenv').config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name, // TODO: Ganti dengan cloudname-mu
  api_key: process.env.api_key, // TODO: Ganti dengan API Key-mu
  api_secret: process.env.api_secret, // TODO: Ganti dengan API Secret-mu
  secure: true,
});

module.exports = cloudinary;

