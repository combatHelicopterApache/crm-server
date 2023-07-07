const { Router } = require("express");
const companyController = require("../controllers/companyController");
const checkAuthMiddleware = require("../middlewares/authMiddleware");
const checkRoleMiddleware = require("../middlewares/roleMiddleware");
const checkCompanyIdMiddleware = require("../middlewares/companyMiddleware");

const router = Router();
router.patch("/company-update/:id", companyController.updateCompanyByKey);
router.get("/companies-list", companyController.getCompanies);
router.get("/company-get/:id", companyController.getCompany);
router.post("/company-create",
    checkAuthMiddleware,
    checkRoleMiddleware,
    checkCompanyIdMiddleware,
    companyController.createCompany
);
router.put("/company-update/:id", companyController.updateCompany);
router.delete("/company-delete/:id", companyController.deleteCompany);

module.exports = router;
