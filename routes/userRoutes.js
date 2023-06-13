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
  middlewares.validateUserDataMiddleware,
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

router.post("/login", validator(loginSchema), userController.loginUser);

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
