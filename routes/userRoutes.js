const { Router } = require("express");
const userController = require("../controllers/userController");
const middlewares = require("../middlewares/middlewares");
const router = Router();
const { loginSchema } = require("../validators/auth.validator");
const validator = require("../helpers/joi.validation.handler");

router.get(
  "/admin-user",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  userController.getSuperAdminUsers
);

router.post(
  "/create",

  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,

  // middlewares.validateUserDataMiddleware,
  userController.crateUser
);

router.get(
  "/",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  middlewares.checkCompanyIdMiddleware,
  userController.getAllUsers
);

router.get(
  "/items",
  middlewares.checkAuthMiddleware,
  middlewares.checkCompanyIdMiddleware,
  userController.getUsersWithParams
);

router.get(
  "/user-list",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  middlewares.checkCompanyIdMiddleware,
  userController.getUsersList
);

router.put(
  "/change-password/:id",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  middlewares.checkCompanyIdMiddleware,
  userController.changeUserPassword
);

router.post("/login", validator(loginSchema), userController.loginUser);

router.post(
  "/login-to-company",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  middlewares.checkCompanyIdMiddleware,
  userController.loginToCompany
);
router.post(
  "/back-to-admin",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  middlewares.checkCompanyIdMiddleware,
  userController.backToAdmin
);

router.get(
  "/token",
  middlewares.checkAuthMiddleware,
  userController.getUserByToken
);

router.get(
  "/:id",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  userController.getUserById
);

router.put(
  "/:id",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  userController.updateUserByID
);

router.delete(
  "/:id",
  middlewares.checkAuthMiddleware,
  middlewares.checkRoleMiddleware,
  userController.deleteUserByID
);

module.exports = router;
