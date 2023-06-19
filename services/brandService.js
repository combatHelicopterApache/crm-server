const Brand = require("../models/brandModel");
const customMessages = require("../common/messages");
const BrandDTO = require("../dtos/brandDto");
const validationService = require("./validationService");

class BrandService {
  async createNew(data) {
    try {
      const { title, description, site, platform } = data;

      const brand = await new Brand({
        title,
        description,
        site,
        platform,
      });

      const createdBrand = await brand.save();

      if (createdBrand) {
        return {
          status: true,
          code: 200,
          message: customMessages.brand.success.add,
          data: await BrandDTO.brandObject(createdBrand),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.brand.failed.add,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async getAll(company_id) {
    try {
      //  if (!validationService.validateMongoId(company_id)) {
      //    return {
      //      status: false,
      //      code: 400,
      //      message: customMessages.id.error,
      //      id: company_id,
      //    };
      //  }

      const brands = await Brand.find({
        // company_id: new mongoose.Types.ObjectId(company_id),
      }).sort({ created_at: 1 });

      if (brands) {
        return {
          status: true,
          code: 200,
          data: await BrandDTO.brandArray(brands),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.brand.common.search.failed,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async getList() {
    try {
      const brands = await Brand.find({}, "id, title").sort({ created_at: 1 });

      if (brands) {
        return {
          status: true,
          code: 200,
          data: await BrandDTO.brandArray(brands),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.brand.common.search.failed,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  // async getListIds() {
  //     try {
  //
  //         const brands = await Brand.find({}, 'id, title').sort({created_at: 1});
  //
  //         if (brands) {
  //             return {
  //                 status: true,
  //                 code: 200,
  //                 data: await BrandDTO.brandArray(brands),
  //             };
  //         } else {
  //             return {
  //                 status: false,
  //                 code: 400,
  //                 message: customMessages.brand.common.search.failed,
  //             };
  //         }
  //     } catch (e) {
  //         return {
  //             code: 500,
  //             error: e.message,
  //         };
  //     }
  // }

  async getById(id) {
    try {
      if (!(await validationService.validateMongoId(id))) {
        return {
          status: false,
          code: 400,
          message: customMessages.id.error,
          id: id,
        };
      }

      const brand = await Brand.findById({ _id: id });
      if (brand) {
        return {
          status: true,
          code: 200,
          data: await BrandDTO.brandObject(brand),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.brand.common.search.failed,
          id: id,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async updateById(id, data) {
    try {
      if (!(await validationService.validateMongoId(id))) {
        return {
          status: false,
          code: 400,
          message: customMessages.id.error,
          id: id,
        };
      }
      const filter = { _id: id };
      const updated = await Brand.findByIdAndUpdate(filter, data, {
        new: true,
      });
      if (updated) {
        return {
          status: true,
          code: 200,
          message: customMessages.brand.success.update,
          data: await BrandDTO.brandObject(updated),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.brand.failed.update,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async deleteById(id) {
    try {
      if (!(await validationService.validateMongoId(id))) {
        return {
          status: false,
          code: 400,
          message: customMessages.id.error,
          id: id,
        };
      }

      const deleted = await Brand.findByIdAndDelete(id);

      if (deleted) {
        return {
          status: true,
          code: 200,
          message: customMessages.brand.success.delete,
          data: await BrandDTO.brandObject(deleted),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.brand.failed.delete,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }
}

module.exports = new BrandService();
