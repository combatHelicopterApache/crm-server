const {Router} = require('express')
const {
    CreateNewGroup,
    GetGroups,
    GetGroupById,
    UpdateGroupByID,
    DeleteGroupByID
} = require("../controllers/groupController");

const router = Router()

router.post(
    '/create',
    CreateNewGroup
)

router.get(
    '/',
    GetGroups
)

router.get(
    '/:id',
    GetGroupById
)

router.put(
    '/:id',
    UpdateGroupByID
)

router.delete(
    '/:id',
    DeleteGroupByID
)



module.exports = router