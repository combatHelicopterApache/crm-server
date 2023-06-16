const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const { uploadToS3 } = require("../common/s3");
const uploadModel = require("../models/uploadModel");

const uploadFile = async (req, res, next) => {
  if (!req || !req.file) return res.status(404).json({ error: "Error" });

  const response = await uploadToS3(req.file);
  const file = uploadModel({
    url: response.Location,
    key: response.Key,
  });
  const newFile = await file.save();
  await unlinkFile(req.file.path);
  res.status(200).send({ data: { url: newFile.url, id: newFile._id } });
};

const deleteFile = async (req, res) => {
  const id = req.params.id;
};

module.exports = { uploadFile, deleteFile };
