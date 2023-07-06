const { Router } = require("express");
const brandController = require("../controllers/brandController");
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
  brandController.createBrand
);
router.patch(
  "/update/:id",
  checkAuthMiddleware,
  checkRoleMiddleware,
  brandController.updateBrand
);

router.get(
  "/",
  checkAuthMiddleware,
  checkRoleMiddleware,
  checkCompanyIdMiddleware,
  brandController.getAllBrands
);

router.get(
  "/admin-list",
  checkAuthMiddleware,
  checkRoleMiddleware,
  checkCompanyIdMiddleware,
  brandController.getAllBrandsAdmin
);

router.get(
  "/brand-list",
  checkAuthMiddleware,
  checkRoleMiddleware,
  checkCompanyIdMiddleware,
  brandController.getBrandList
);

router.get(
  "/:id",
  checkAuthMiddleware,
  checkRoleMiddleware,
  brandController.getBrandById
);

router.put(
  "/:id",
  checkAuthMiddleware,
  checkRoleMiddleware,
  brandController.updateBrandById
);

router.delete(
  "/:id",
  checkAuthMiddleware,
  checkRoleMiddleware,
  brandController.deleteBrandById
);

module.exports = router;
