const {Router} = require('express')
const statusController = require('../controllers/statusController')
const checkAuthMiddleware = require("../middlewares/authMiddleware");
const checkRoleMiddleware = require("../middlewares/roleMiddleware");
const checkCompanyIdMiddleware = require("../middlewares/companyMiddleware");

const router = Router()

router.post(
    '/create',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    statusController.createNewStatus
)

router.get(
    '/',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    statusController.getStatuses
)

router.get(
    '/list',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    statusController.getStatusesList
)

router.get(
    '/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    statusController.getStatusById
)

router.put(
    '/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    statusController.updateStatusById
)

router.delete(
    '/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    statusController.deleteStatusById
)



module.exports = router