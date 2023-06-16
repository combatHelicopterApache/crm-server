require("dotenv").config();
const { Router } = require("express");
const uploadRouter = Router();
const upload = require("../common/multer");
const { uploadFile } = require("../controllers/uploadController");

uploadRouter.post("/upload-single", upload.single("media"), uploadFile);

module.exports = uploadRouter;
