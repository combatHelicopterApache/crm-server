const customMessages = require("../common/messages");
const companyModel = require("../models/companyModel");
const brandModel = require("../models/brandModel");
const validationService = require("./validationService");
const CompanyDTO = require("../dtos/companyDto");
const mongoose = require("mongoose");

class CompanyService {
  async getCompanies() {
    try {
      const result = await companyModel.find();

      if (!result) {
        return {
          status: false,
          code: 400,
          message: customMessages.company.common.search.failed,
        };
      }
      return {
        status: true,
        code: 200,
        message: customMessages.company.success.get,
        data: CompanyDTO.companyArray(result),
        count: result.length,
      };
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async createCompany(data) {
    try {
      const result = await new companyModel(data);

      const createdCompany = await result.save();

      if (result) {
        return {
          status: true,
          code: 200,
          message: customMessages.company.success.add,
          data: CompanyDTO.companyObject(createdCompany),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.company.failed.add,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async updateCompany(id, updatedFields) {
    try {
      const updatedCompany = await companyModel.findOneAndUpdate(
        { _id: id },
        { $set: updatedFields },
        { new: true }
      );

      return {
        status: true,
        code: 200,
        message: customMessages.company.success.update,
        data: CompanyDTO.companyObject(updatedCompany),
      };
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async deleteCompany(id) {
    try {
      const result = await companyModel.findByIdAndDelete({ _id: id });

      if (result) {
        return {
          status: true,
          code: 200,
          message: customMessages.company.success.delete,
          data: CompanyDTO.companyObject(result),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.company.failed.delete,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async getCompany(id) {
    try {
      const company = await companyModel
        .findById(id)
        .populate({ path: "owner_id", model: "Users" });
      //   const company = await companyModel.aggregate([
      //     { $match: { _id: new mongoose.Types.ObjectId(id) } },
      //     {
      //       $lookup: {
      //         from: "users",
      //         localField: "owner_id",
      //         foreignField: "_id",
      //         as: "owner",
      //       },
      //     },
      //     { $unwind: "$owner" },
      //     {
      //       $lookup: {
      //         from: "brands",
      //         localField: "brands",
      //         foreignField: "_id",
      //         as: "brands",
      //       },
      //     },
      //   ]);

      //   console.log(company);

      return {
        status: true,
        code: 200,
        message: customMessages.company.success.update,
        data: CompanyDTO.companyObject(company),
      };
    } catch (error) {
      return {
        code: 500,
        error: error.message,
      };
    }
  }
}

module.exports = new CompanyService();
