const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();
const { loginSchema } = require("../validators/auth.validator");
const validator = require("../helpers/joi.validation.handler");
const checkRestriction = require('../middlewares/restrictionMiddleware')
const checkPermissions = require('../middlewares/permisssionsMiddleware')
const checkAuthMiddleware = require('../middlewares/authMiddleware')
const checkRoleMiddleware = require('../middlewares/roleMiddleware')
const checkCompanyIdMiddleware = require('../middlewares/companyMiddleware')

router.get(
  "/admin-user",
  checkAuthMiddleware,
  checkRoleMiddleware,
  userController.getSuperAdminUsers
);

router.post(
  "/create",

  checkAuthMiddleware,
  checkRoleMiddleware,

  // validateUserDataMiddleware,
  userController.crateUser
);

router.get(
  "/",
  checkAuthMiddleware,
  checkRoleMiddleware,
  checkCompanyIdMiddleware,
  userController.getAllUsers
);

router.get(
  "/items",
  checkAuthMiddleware,
  checkCompanyIdMiddleware,
  userController.getUsersWithParams
);

router.get(
  "/user-list",
  checkAuthMiddleware,
  checkRoleMiddleware,
  checkCompanyIdMiddleware,
  userController.getUsersList
);

router.put(
  "/change-password/:id",
  checkAuthMiddleware,
  checkRoleMiddleware,
  checkCompanyIdMiddleware,
  userController.changeUserPassword
);

router.post("/login", validator(loginSchema), userController.loginUser);

router.post(
  "/login-to-company",
  checkAuthMiddleware,
  checkRoleMiddleware,
  checkCompanyIdMiddleware,
  userController.loginToCompany
);
router.post(
  "/back-to-admin",
  checkAuthMiddleware,
  checkRoleMiddleware,
  checkCompanyIdMiddleware,
  userController.backToAdmin
);

router.get(
  "/token",
  checkAuthMiddleware,
  userController.getUserByToken
);

router.get(
  "/:id",
  checkAuthMiddleware,
  checkRoleMiddleware,
  userController.getUserById
);

router.put(
  "/:id",
  checkAuthMiddleware,
  checkRoleMiddleware,
  userController.updateUserByID
);

router.delete(
  "/:id",
  checkAuthMiddleware,
  checkRoleMiddleware,
  userController.deleteUserByID
);

module.exports = router;
