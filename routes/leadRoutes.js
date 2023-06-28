const {Router} = require('express')
const leadController = require("../controllers/leadController");
const checkRestriction = require('../middlewares/restrictionMiddleware')
const checkPermissions = require('../middlewares/permisssionsMiddleware')
const checkAuthMiddleware = require('../middlewares/authMiddleware')
const checkRoleMiddleware = require('../middlewares/roleMiddleware')

const router = Router()

router.post(
    '/create',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkPermissions('leads'),
    checkRestriction('leads', 'lead_access'),
    leadController.createNewLead
)

router.get(
    '/',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkPermissions('leads'),
    checkRestriction('leads', 'lead_access'),
    leadController.getLeads
)

router.get(
    '/:id',

    checkAuthMiddleware,
    checkRoleMiddleware,
    checkPermissions('leads'),
    checkRestriction('leads', 'lead_access'),
    leadController.getLeadById
)

router.put(
    '/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkPermissions('leads'),
    checkRestriction('leads', 'lead_access'),
    leadController.updateLeadById
)

router.delete(
    '/:id',
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkPermissions('leads'),
    checkRestriction('leads', 'lead_access'),
    leadController.deleteLeadById
)


//

module.exports = router