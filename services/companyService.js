const customMessages = require("../common/messages");
const companyModel = require("../models/companyModel");
const validationService = require("./validationService");

class CompanyService {
  async getCompanies() {
    const result = await companyModel.find();

    if (!result) {
      return { status: false };
    }
    const prepareResult = result?.reduce((acc, item, idx) => {
      acc.push({
        address: item.addrees,
        admin_email: item.admin_email,
        admin_name: item.admin_name,
        admin_phone: item.admin_phone,
        company_email: item.company_email,
        company_identifier: item.company_identifier,
        company_name: item.company_name,
        company_phone: item.company_phone,
        createdAt: item.createdAt,
        notes: item.notes,
        title: item.title,
        updatedAt: item.updatedAt,
        id: item._id,
        status: item.status,
        key: idx,
      });
      return acc;
    }, []);

    const data = {
      status: true,
      // message: customMessages.company.success.get,
      data: prepareResult,
      count: prepareResult.length,
    };
    return data;
  }

  async createCompany(data) {
    const result = await new companyModel(data);

    await result.save();

    if (result) {
      return {
        status: true,
        data: result,
      };
    } else {
      return { status: false };
    }
  }

  async updateCompany(id, updatedFields) {
    const updatedCompany = await companyModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );

    return updatedCompany;
  }

  async deleteCompany(id) {
    if (!(await validationService.validateMongoId(id)))
      return { status: false, message: customMessages.id.error, id: id };
    const result = await companyModel.findByIdAndDelete({ id });
    const userData = await this.prepareCompanyData(result);
    if (result) {
      return {
        status: true,
        // message: customMessages.company.success.delete,
        data: userData,
      };
    } else {
      return { status: false };
    }
  }

  async prepareCompanyData(data) {
    return [data].reduce((acc, item, idx) => {
      (acc.address = item.addrees),
        (acc.admin_email = item.admin_email),
        (acc.admin_name = item.admin_name),
        (acc.admin_phone = item.admin_phone),
        (acc.company_email = item.company_email),
        (acc.company_identifier = item.company_identifier),
        (acc.company_name = item.company_name),
        (acc.company_phone = item.company_phone),
        (acc.createdAt = item.createdAt),
        (acc.notes = item.notes),
        (acc.title = item.title),
        (acc.updatedAt = item.updatedAt),
        (acc.id = item._id),
        (acc.status = item.status),
        (acc.key = idx);
      return acc;
    }, {});
  }
}

module.exports = new CompanyService();
