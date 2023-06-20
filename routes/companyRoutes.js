const { Router } = require("express");
const  companyController = require("../controllers/companyController");

const router = Router();

router.get("/companies-list", companyController.getCompanies);
router.get("/company-get/:id", companyController.getCompany);
router.post("/company-create", companyController.createCompany);
router.put("/company-update/:id", companyController.updateCompany);
router.delete("/company-delete/:id", companyController.deleteCompany);

module.exports = router;
