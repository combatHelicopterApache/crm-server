const companyService = require("../services/companyService");
const userService = require("../services/userService");

class CompanyController {
  async getCompanies(req, res) {
    try {
      const result = await companyService.getCompanies();

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  async createCompany(req, res) {
    try {
      const result = await companyService.createCompany(req.body);

      const newOwnerUser = await userService.createOwnerUserForNewCompany({
        ...req.body,
        company_id: result.data._id.toString(),
        company_name: result.data.company_name,
      });

      const setFiledsToCompany = companyService.updateCompany(
        result.data._id.toString(),
        {
          owner_id: newOwnerUser.user._id.toString(),
          owner: newOwnerUser.user._id.toString(),
        }
      );

      return res
        .status(200)
        .json({ ...result, newOwnerUser, setFiledsToCompany });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async updateCompany(req, res) {
    try {
      const result = await companyService.updateCompany();
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }

  async deleteCompany(req, res) {
    try {
      const result = await companyService.deleteCompany(req.params.id);
      return res.send(result);
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
}

module.exports = new CompanyController();
