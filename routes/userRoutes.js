const {Router} = require('express')
const userController = require("../controllers/userController");
const middlewares = require('../middlewares/middlewares')
const router = Router()

router.post(
    '/create',
	middlewares.validateUserData,
    userController.crateUser
)

router.get(
    '/',
    userController.getAllUsers
)

router.get(
	'/items',
	userController.getUsersWithParams
)

router.post(
	'/login',
	middlewares.validateLoginData,
	userController.loginUser
)

router.get(
    '/token',
    userController.getUserByToken
)


router.get(
	'/:id',
	userController.getUserById
)

router.put(
    '/:id',
    userController.updateUserByID
)

router.delete(
    '/:id',
    userController.deleteUserByID
)




module.exports = router