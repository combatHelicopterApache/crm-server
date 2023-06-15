const { model, Schema, ObjectId } = require("mongoose");

const officeModel = new Schema(
    {
        title: { type: String, required: false, default: "" },
        address: { type: String, required: false, default: "" },
        description: { type: String, required: false, default: "" },
        company_id: { type: ObjectId, ref: "Company", require: false },
        time_cards: {
            type: Object,
            required: false,
            default: { time_start: "10:00", time_end: "19:00" },
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

module.exports = model("Office", officeModel);
