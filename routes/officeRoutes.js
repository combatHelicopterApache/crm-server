const { Router } = require("express");
const officeController = require("../controllers/officeController");
const middlewares = require("../middlewares/middlewares");
const router = Router();



router.post(
    "/create",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    officeController.createOffice
);

router.get(
    "/",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    middlewares.checkCompanyIdMiddleware,
    officeController.getAllOffices
);

router.get(
    "/:id",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    officeController.getOfficeById
);

router.put(
    "/:id",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    officeController.updateOfficeById
);

router.delete(
    "/:id",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    officeController.deleteOfficeById
);

module.exports = router;
