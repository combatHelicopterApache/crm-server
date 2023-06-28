const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const userModel = new Schema(
  {
    full_name: { type: String, required: true },
    title: { type: String, required: false, default: "" },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, required: true, default: false },
    user_logo: { type: String, required: false, default: "" },
    active: { type: Boolean, default: true },
    role_id: { type: Number, required: true, default: 6 },
    role_name: { type: String, required: true, default: "AGENT" },
    company_id: {
      type: ObjectId,
      required: true,
      default: () => new ObjectId(),
    },
    company_name: { type: String, required: true, default: "Default Company" },
    background_color: { type: String, required: false, default: "#626ed4" },
    notes: { type: String, default: "", required: false },
    address: { type: String, default: "", required: false },
    user_identifier: { type: String, default: "AM", required: false },
    user_sales_role_id: { type: Number, default: 1, required: false },
    user_sales_role: { type: String, default: "sales", required: false }, // sales/retention/both
    avatar_id: { type: ObjectId, ref: "Uploads", required: false },
    permissions: {
      leads: { type: Boolean, default: true },
      affiliates: { type: Boolean, default: true },
      deposits: { type: Boolean, default: true },
      calendar: { type: Boolean, default: true },
      groups: { type: Boolean, default: true },
      analytics: { type: Boolean, default: true },
      settings: { type: Boolean, default: true },
      offices: { type: Boolean, default: true },
      users: { type: Boolean, default: true },
      company_info: { type: Boolean, default: true },
    },
    restrictions: {
      leads: {
        lead_upload: { type: Boolean, default: true },
        lead_download: { type: Boolean, default: true },
        lead_access: { type: [Number], default: [4] },
      },
      affiliates: {
        affiliates_access: { type: [Number], default: [4] },
      },
      deposits: {
        deposits_access: { type: [Number], default: [4] },
      },
      calendar: {
        calendar_access: { type: [Number], default: [4] },
      },
      groups: {
        groups_access: { type: [Number], default: [4] },
      },
      analytics: {
        analytics_access: { type: [Number], default: [4] },
      },
      settings: {
        user_access: { type: [Number], default: [4] },
        office_access: { type: [Number], default: [4] },
        company_access: { type: [Number], default: [4] },
      },
    },
    user_ips: { type: [String], default: [""] },
    last_login: { type: Date, default: null },
    login_from_admin: { type: Boolean, required: false, default: false },
    brands: [
      {
        brand_id: { type: ObjectId, default: "" },
        brand_name: { type: String, default: "" },
      },
    ],
    desk_id: { type: ObjectId, default: null, required: false },
    desk_name: { type: String, default: null, required: false },
    manager_id: { type: ObjectId, default: null, required: false },
    manager_name: { type: String, default: null, required: false },
    owner_id: { type: ObjectId, default: null, required: false },
    owner_name: { type: String, default: null, required: false },
    time_cards: {
      type: Object,
      required: false,
      default: () => ({ time_start: "10:00", time_end: "19:00" }),
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = model("Users", userModel);
