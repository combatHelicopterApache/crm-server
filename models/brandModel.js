const { model, Schema, ObjectId } = require("mongoose");

const brandModel = new Schema(
  {
    title: { type: String, required: false, default: "New Brand" },
    description: { type: String, required: false, default: "" },
    office_id: { type: ObjectId, ref: "Office", require: false },
    site: [
      {
        site_id: { type: ObjectId, require: false },
        site_logo: { type: String, require: false },
        site_name: { type: String, require: false },
        site_domains: { type: Array, require: false, unique: true },
      },
    ],
    platform: {
      cfd_id: { type: ObjectId, require: false },
      cfd_logo: { type: String, require: false },
      cfd_name: { type: String, require: false },
      cfd_domain: { type: String, require: false },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Brand", brandModel);
