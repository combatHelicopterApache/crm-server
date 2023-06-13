const { MODULES, UserRole } = require("../const/user");

const getModulesByRole = (role_id) => {
  let activeModules = [];

  switch (role_id) {
    case UserRole.OWNER:
    case UserRole.ADMIN:
    case UserRole.MANAGER:
      activeModules = [
        "dashboard",
        "leads",
        "affiliates",
        "deposits",
        "calendar",
        "groups",
        "users",
        "analytics",
        "settings",
      ];
      break;

    case UserRole.AGENT:
      activeModules = ["leads"];
      break;
    case UserRole.WORKER:
      activeModules = ["leads"];
      break;
    case UserRole.ACCOUNT_MANAGER:
      activeModules = ["dashboard", "leads", "analytics"];
      break;

    default:
      return activeModules;
  }

  const modules = { ...MODULES };

  Object.keys(modules).forEach((module) => {
    modules[module] = activeModules.includes(module) ? true : false;
  });

  return modules;
};

module.exports = {
  getModulesByRole,
};
