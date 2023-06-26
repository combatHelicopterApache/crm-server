const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;
const uploadSchema = new Schema(
  {
    url: { type: String, required: true, unique: true },
    key: { type: String, required: true, unique: true },
  }, {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
);

const uploadModel = mongoose.model("Uploads", uploadSchema);

module.exports = uploadModel;
