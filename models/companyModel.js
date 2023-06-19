const mongoose = require("mongoose");
const {
  model,
  Schema,
  Types: { ObjectId },
} = mongoose;

const companyModel = new Schema(
  {
    company_name: { type: String, required: true, unique: false },
    company_email: { type: String, required: true, unique: false },
    company_phone: { type: String, required: true, unique: false },
    admin_name: { type: String, required: true, unique: false },
    admin_phone: { type: String, required: true, unique: false },
    admin_email: { type: String, required: true, unique: false },
    company_identifier: { type: String, required: true, unique: false },
    address: { type: String, required: true, unique: false },
    title: { type: String, required: false, unique: false },
    notes: { type: String, required: false, unique: false },
    status: { type: Number, required: true, unique: false },
    owner_id: { type: String, required: false, unique: false },
    owner_name: { type: ObjectId, ref: "Users", required: false },
    brands: [{ type: ObjectId, ref: "Brand", required: false }],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Company", companyModel);
