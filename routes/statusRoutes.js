const {Router} = require('express')
const statusController = require('../controllers/statusController')

const router = Router()

router.post(
    '/create',
    statusController.createNewStatus
)

router.get(
    '/',
    statusController.getStatuses
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