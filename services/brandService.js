const Brand = require("../models/brandModel");
const customMessages = require("../common/messages");

class BrandService {
  async createNew(data) {
    try {
      const { title, description, office_id, site, platform } = data;

      const brand = await new Brand({
        title,
        description,
        office_id,
        site,
        platform,
      });

      const createdBrand = await brand.save();

      if (createdBrand) {
        return {
          status: true,
          code: 200,
          message: customMessages.user.success.add,
          user: createdBrand,
        };
      } else {
        return {
          status: false,
          code: 400,
          message: customMessages.user.failed.add,
        };
      }
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async getAll(data) {
    try {
      return {
        code: 200,
        data: ["Brand"],
      };
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async getById(data) {
    try {
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async updateById(data) {
    try {
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }

  async deleteById(data) {
    try {
    } catch (e) {
      return {
        code: 500,
        error: e.message,
      };
    }
  }
}

module.exports = new BrandService();
