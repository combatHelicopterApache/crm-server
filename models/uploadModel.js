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
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

const uploadModel = mongoose.model("Uploads", uploadSchema);

module.exports = uploadModel;
