const officeService = require("../services/officeService");

class OfficeController {
  async createOffice(req, res) {
    try {
      const result = await officeService.createNew(req);
      return res.status(result.code).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getOfficeById(req, res) {
    try {
      const result = await officeService.getById(req.params.id);
      return res.status(result.code).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getAllOffices(req, res) {
    try {
      const result = await officeService.getAll(req.company_id);
      return res.status(result.code).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async updateOfficeById(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const result = await officeService.updateById(id, data);
      return res.status(result.code).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async deleteOfficeById(req, res) {
    try {
      const result = await officeService.deleteById(req.params.id);
      return res.status(result.code).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new OfficeController();
