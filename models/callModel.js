const mongoose = require("mongoose");
const { Schema, Types: { ObjectId }} = mongoose;
const callSchema = new Schema(
    {
        duration: { type: Number, required: false },
        call_start: { type: String, required: false },
        call_end: { type: String, required: false, unique: true },
        user_id: { type: ObjectId, ref:'Users', required: false },
        lead_id: { type: ObjectId, ref:'Leads', required: false },
    }, {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
);

const uploadModel = mongoose.model("Calls", callSchema);

module.exports = uploadModel;
