import express from 'express';
import handleUploadImg from "../controllers/UploadImgController.js";

const UploadImgRoute = express.Router();

UploadImgRoute.post('/api/upload/img', (req, res) => {
    handleUploadImg(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

export default UploadImgRoute;

