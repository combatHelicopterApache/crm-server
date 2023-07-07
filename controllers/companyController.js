const companyService = require("../services/companyService");
const userService = require("../services/userService");
const statusService = require("../services/statusService");

class CompanyController {
    async getCompanies(req, res) {
        try {
            const result = await companyService.getCompanies();

            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async createCompany(req, res) {
        try {
            const result = await companyService.createCompany(req.body);

            const newOwnerUser = await userService.createOwnerUserForNewCompany({
                ...req.body,
                company_id: result.data.id.toString(),
                company_name: result.data.company_name,
            });

            if (!newOwnerUser.status) {
                return res.status(result.code).json(newOwnerUser);
            }

            const createDefaultStatus = await statusService.createDefaultStatus({ user_id: req.user.id, company_id: result.data.id.toString() })


            const setFieldsToCompany = companyService.updateCompany(
                result.data.id.toString(),
                {
                    owner_id: newOwnerUser.user.id.toString(),
                    owner: newOwnerUser.user.id.toString(),
                }
            );
            return res
                .status(result.code)
                .json({...result, newOwnerUser, setFieldsToCompany, default_status: createDefaultStatus});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async updateCompany(req, res) {
        try {
            const result = await companyService.updateCompany(
                req.params.id,
                req.body
            );
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async deleteCompany(req, res) {
        try {
            const result = await companyService.deleteCompany(req.params.id);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async updateCompanyByKey(req, res) {
        try {
            const result = await companyService.updateCompanyByKey(req);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async getCompany(req, res) {
        try {
            const result = await companyService.getCompany(req.params.id);
            return res.status(result.code).send(result);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new CompanyController();
