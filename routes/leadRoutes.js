const {Router} = require('express')
const {
    CreateNewLead,
    GetLeads,
    GetLeadById,
    UpdateLeadByID,
    DeleteLeadByID
} = require("../controllers/leadController");
const middlewares = require('../middlewares/middlewares')
const checkRestriction = require('../middlewares/restrictionMiddleware')

const router = Router()

router.post(
    '/create',
    CreateNewLead
)

router.get(
    '/',
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    checkRestriction('lead', 'general', 'lead_events'),
    GetLeads
)

router.get(
    '/:id',
    GetLeadById
)

router.put(
    '/:id',
    UpdateLeadByID
)

router.delete(
    '/:id',
    DeleteLeadByID
)


//

module.exports = router