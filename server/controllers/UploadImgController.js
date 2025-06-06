import { v2 as cloudinary } from 'cloudinary'

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUD_KEY;
const api_secret = process.env.CLOUD_SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const handleUploadImg = (image) => {
  //image = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      return reject({ message: error.message });
    });
  });
};

export default handleUploadImg;

