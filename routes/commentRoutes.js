const {Router} = require('express')
const commentController = require("../controllers/commentController");
const checkAuthMiddleware = require('../middlewares/authMiddleware')
const checkRoleMiddleware = require('../middlewares/roleMiddleware')

const router = Router()

router.post(
    '/:element/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    commentController.createNewComment
)

router.get(
    '/:element/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    commentController.getCommentById
)

router.delete(
    '/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    commentController.deleteCommentById
)


module.exports = router