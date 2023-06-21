const Response = require("../common/responseMessages");
const companyModel = require("../models/companyModel");
const CompanyDTO = require("../dtos/companyDto");
const mongoose = require("mongoose");

class CompanyService {
  async createCompany(data) {
    try {
      const result = await new companyModel(data);

      const createdCompany = await result.save();

      if (result) {
        return {
          status: true,
          code: 200,
          message: Response.post("company", true),
          data: CompanyDTO.companyObject(createdCompany),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.post("company", false),
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async getCompanies() {
    try {
      const result = await companyModel.find();

      if (!result) {
        return {
          status: false,
          code: 400,
          message: Response.search("company", false),
        };
      }
      return {
        status: true,
        code: 200,
        message: Response.get("company", true),
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
        message: Response.update("company", true),
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
          message: Response.delete("company", true),
          data: CompanyDTO.companyObject(result),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.delete("company", false),
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
      const company = await companyModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "owner_id",
            foreignField: "_id",
            as: "owner",
          },
        },
        { $unwind: "$owner" },
        {
          $lookup: {
            from: "brands",
            localField: "brands",
            foreignField: "_id",
            as: "brands",
          },
        },

      ]);

      return {
        status: true,
        code: 200,
        message: Response.get("company", true),
        data: CompanyDTO.companyObjects(company),
      };
    } catch (error) {
      return {
        code: 500,
        error: error.message,
      };
    }
  }

  async updateCompanyByKey(req) {
    const companyId = req.params.id;
    const updates = req.body;
    try {
      const company = await companyModel.findById(companyId);

      if (!company) {
        return {
          status: false,
          code: 400,
          message: Response.search("company", false),
        };
      }

      for (const field in updates) {
        if (field in company) {
          company[field] = updates[field];
        }
      }

      await company.save();

      return {
        status: true,
        code: 200,
        message: Response.update("company", true),
      };
    } catch (error) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }
}

module.exports = new CompanyService();
