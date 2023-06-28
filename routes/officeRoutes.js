const { Router } = require("express");
const officeController = require("../controllers/officeController");
const checkRestriction = require('../middlewares/restrictionMiddleware')
const checkPermissions = require('../middlewares/permisssionsMiddleware')
const checkAuthMiddleware = require('../middlewares/authMiddleware')
const checkRoleMiddleware = require('../middlewares/roleMiddleware')
const checkCompanyIdMiddleware = require('../middlewares/companyMiddleware')

const router = Router();



router.post(
    "/create",
    checkAuthMiddleware,
    checkRoleMiddleware,
    officeController.createOffice
);

router.get(
    "/",
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    officeController.getAllOffices
);

router.get(
    "/:id",
    checkAuthMiddleware,
    checkRoleMiddleware,
    officeController.getOfficeById
);

router.put(
    "/:id",
    checkAuthMiddleware,
    checkRoleMiddleware,
    officeController.updateOfficeById
);

router.delete(
    "/:id",
    checkAuthMiddleware,
    checkRoleMiddleware,
    officeController.deleteOfficeById
);

module.exports = router;
