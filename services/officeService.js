const Office = require("../models/officeModel");
const OfficeDTO = require("../dtos/officeDto");
const validationService = require("./validationService");
const Response = require('../common/responseMessages')

class OfficeService {
  async createNew(data) {
    try {
      const { title, address, description, company_id } = data;

      const office = await new Office({
        title,
        address,
        description,
        company_id,
      });

      const createdOffice = await office.save();

      if (createdOffice) {
        return {
          status: true,
          code: 200,
          message: Response.post('office', true),
          data: await OfficeDTO.officeObject(createdOffice),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.post('office', false),
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
      if (!(await validationService.validateMongoId(company_id))) {
        return {
          status: false,
          code: 400,
          message: Response.errors('id'),
          id: company_id,
        };
      }
      const offices = await Office.find({
        company_id: company_id.toString(),
      }).sort({ created_at: 1 });

      if (offices) {
        return {
          status: true,
          code: 200,
          message: Response.get('office', true),
          data: await OfficeDTO.officeArray(offices),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.search('office', false),
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
        return { status: false, message: Response.errors('id'), id: id };
      }

      const office = await Office.findById({ _id: id });
      if (office) {
        return {
          status: true,
          code: 200,
          message: Response.get('office', true),
          data: await OfficeDTO.officeObject(office),

        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.search('office', false),
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
      const updated = await Office.findByIdAndUpdate(filter, data, {
        new: true,
      });
      if (updated) {
        return {
          status: true,
          code: 200,
          message: Response.update('office', true),
          data: await OfficeDTO.officeObject(updated),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.get('office', false),
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

      const deleted = await Office.findByIdAndDelete(id);

      if (deleted) {
        return {
          status: true,
          code: 200,
          message: Response.delete('office', true),
          data: await OfficeDTO.officeObject(deleted),
        };
      } else {
        return {
          status: false,
          code: 400,
          message: Response.delete('office', false),
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

module.exports = new OfficeService();
