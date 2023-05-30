const {Router} = require('express')
const {
    CreateNewLead,
    GetLeads,
    GetLeadById,
    UpdateLeadByID,
    DeleteLeadByID
} = require("../controllers/leads/leads.controller");

const router = Router()

router.post(
    '/create',
    CreateNewLead
)

router.get(
    '/',
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



module.exports = router