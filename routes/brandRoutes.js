const { Router } = require("express");
const brandController = require("../controllers/brandController");
const middlewares = require("../middlewares/middlewares");
const router = Router();



router.post(
    "/create",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    brandController.createBrand
);

router.get(
    "/",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    middlewares.checkCompanyIdMiddleware,
    brandController.getAllBrands
);



router.get(
    "/:id",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    brandController.getBrandById
);

router.put(
    "/:id",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    brandController.updateBrandById
);

router.delete(
    "/:id",
    middlewares.checkAuthMiddleware,
    middlewares.checkRoleMiddleware,
    brandController.deleteBrandById
);

module.exports = router;
