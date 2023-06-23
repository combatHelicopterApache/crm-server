const mongoose = require("mongoose");
const {
    Schema,
    Types: { ObjectId },
} = mongoose;
const callSchema = new Schema(
    {
        count: { type: String, required: true, unique: true },
        key: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

const uploadModel = mongoose.model("Calls", callSchema);

module.exports = uploadModel;
