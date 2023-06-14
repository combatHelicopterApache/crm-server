const { model, Schema, ObjectId } = require("mongoose");

const brandModel = new Schema(
    {
        title: { type: String, required: false, default: "" },
        note: { type: String, required: false, default: "" },
        office_id: { type: ObjectId, ref: "Office", require: false  },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

module.exports = model("Brand", brandModel);
