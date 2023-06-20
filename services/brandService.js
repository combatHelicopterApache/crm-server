const Brand = require("../models/brandModel");
const BrandDTO = require("../dtos/brandDto");
const validationService = require("./validationService");
const Response = require('../common/responseMessages')

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
          message: Response.post('brand', true),
          data: await BrandDTO.brandObject(createdBrand),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.post('brand', false),
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
      const brands = await Brand.find().sort({ created_at: 1 });

      if (brands) {
        return {
          status: true,
          code: 200,
          message: Response.get('brand', true),
          data: await BrandDTO.brandArray(brands),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.search('brand', false),
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
          message: Response.get('brands', true),
          data: await BrandDTO.brandArray(brands),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.search('brands', false),
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }


  async getById(id) {
    try {
      if (!(await validationService.validateMongoId(id))) {
        return {
          status: false,
          code: 400,
          message: Response.errors('id'),
          id: id,
        };
      }

      const brand = await Brand.findById({ _id: id });
      if (brand) {
        return {
          status: true,
          code: 200,
          message: Response.get('brand', true),
          data: await BrandDTO.brandObject(brand),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.get('brand', false),
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
          message: Response.errors('id'),
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
          message: Response.update('brand', true),
          data: await BrandDTO.brandObject(updated),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.update('brand', false),
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
          message: Response.errors('id'),
          id: id,
        };
      }

      const deleted = await Brand.findByIdAndDelete(id);

      if (deleted) {
        return {
          status: true,
          code: 200,
          message: Response.delete('brand', true),
          data: await BrandDTO.brandObject(deleted),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.delete('brand', false),
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
