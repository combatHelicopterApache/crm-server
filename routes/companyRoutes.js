const { Router } = require("express");
const {
	getCompanies, createCompany, updateCompany, deleteCompany
} = require("../controllers/companyController");

const router = Router();

router.get("/companies-list", getCompanies);
// router.get("/company/:id", getCompany);
router.post("/company-create", createCompany);
router.put("/company-update/:id", updateCompany);
router.delete("/company-delete/:id", deleteCompany);

module.exports = router;

