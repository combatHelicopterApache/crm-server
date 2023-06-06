const { Router } = require("express");
const {
	getCompanies, createCompany, updateCompany, deleteCompany
} = require("../controllers/companyController");

const router = Router();

router.get("/companies-list", getCompanies);
router.post("/company-create", createCompany);
router.put("/company-update", updateCompany);
router.delete("/company-delete", deleteCompany);

module.exports = router;
