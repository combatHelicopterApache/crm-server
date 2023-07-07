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

router.post(
    '/change-status/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    statusController.changeLeadStatus
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
    statusController.getStatusById
)

router.put(
    '/:id',
    statusController.updateStatusById
)

router.delete(
    '/:id',
    statusController.deleteStatusById
)



module.exports = router