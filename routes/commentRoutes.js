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

router.put(
    '/:element/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    commentController.updateCommentById
)

router.delete(
    '/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    commentController.deleteCommentById
)


module.exports = router