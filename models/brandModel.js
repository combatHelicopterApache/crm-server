const { model, Schema, Types: { ObjectId } } = require("mongoose");

const brandModel = new Schema(
  {
    title: { type: String, required: false, default: "Default brand" },
    description: { type: String, required: false, default: "" },
    active: { type: Boolean, required: false, default: true },
    logo: { type: String, required: false, default: "" },
    site: [
      {
        site_id: { type: ObjectId, require: false, default: new ObjectId },
        site_logo: { type: String, require: false },
        site_name: { type: String, require: false },
        site_domains: { type: [String], require: false, unique: false },
      },
    ],
    platform: [
      {
        cfd_id: { type: ObjectId, require: false, default: new ObjectId },
        cfd_logo: { type: String, require: false },
        cfd_name: { type: String, require: false },
        cfd_domain: { type: String, require: false },
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Brands", brandModel);
