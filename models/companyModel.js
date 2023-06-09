const { model, Schema } = require("mongoose");

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
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = model("Company", companyModel);
