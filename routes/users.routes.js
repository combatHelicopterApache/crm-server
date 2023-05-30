const {Router} = require('express')
const {
    CreateNewUser,
    GetUsers,
    GetUserById,
    UpdateUserByID,
    DeleteUserByID
} = require("../controllers/users/users.controller");

const router = Router()

router.post(
    '/create',
    CreateNewUser
)

router.get(
    '/',
    GetUsers
)

router.get(
    '/:id',
    GetUserById
)

router.put(
    '/:id',
    UpdateUserByID
)

router.delete(
    '/:id',
    DeleteUserByID
)



module.exports = router