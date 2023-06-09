const { Router } = require("express")
const userController = require("../controllers/userController")
const middlewares = require("../middlewares/middlewares")
const router = Router()

router.get("/admin-user", userController.getSuperAdminUsers)

router.post(
  "/create",
  middlewares.validateUserDataMiddleware,
  userController.crateUser
)

router.get(
    "/",
    middlewares.checkRoleMiddleware,
    userController.getAllUsers
)

router.get(
    "/items",
    userController.getUsersWithParams
)

router.post(
  "/login",
  middlewares.validateLoginDataMiddleware,
  userController.loginUser
)

router.get(
    "/token",
    userController.getUserByToken
)

router.get(
    "/:id",
    userController.getUserById
)

router.put(
    "/:id",
    userController.updateUserByID
)

router.delete(
    "/:id",
    userController.deleteUserByID
)

module.exports = router
