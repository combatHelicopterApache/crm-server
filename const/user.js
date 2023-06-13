const { generateRandomLetters } = require("../helpers/generateRandomLetters");
const MODULES = {
  dashboard: true,
  leads: true,
  affiliates: true,
  deposits: true,
  calendar: true,
  groups: true,
  users: true,
  analytics: true,
  settings: true,
};

const UserRole = {
  DEFAULT_SUPER_ADMIN: 1,
  OWNER: 2,
  ADMIN: 3,
  MANAGER: 4,
  AGENT: 5,
  WORKER: 6,
  ACCOUNT_MANAGER: 7,
};

const UserStatus = {
  INACTIVE: 1,
  ACTIVE: 2,
  PENDING: 3,
};

const initialUser = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
  permissions: MODULES,
  role_id: UserRole.AGENT,
  manager_id: null,
  admin_id: null,
  brand_id: null,
  status: UserStatus.ACTIVE,
  title: "",
  background_color: "#626ed4",
  user_identifier: generateRandomLetters(2),
  notes: "",
  owner_id: null,
  owner: null,
};

module.exports = {
  MODULES,
  UserRole,
  UserStatus,
  initialUser,
};
