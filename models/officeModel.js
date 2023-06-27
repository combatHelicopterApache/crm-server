const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const officeModel = new Schema(
  {
    title: { type: String, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    description: { type: String, required: false, default: "" },
    company_id: { type: ObjectId, ref: "Companies", require: false },
    manager_id: { type: ObjectId, require: true },
    active: { type: Boolean, required: false, default: true },
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

module.exports = model("Offices", officeModel);
