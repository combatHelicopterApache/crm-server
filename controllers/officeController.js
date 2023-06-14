const officeService = require("../services/officeService");

class OfficeController {
    async createOffice (req, res) {
        try {
            const result = await officeService.createNew(req.body);
            return res.status(result.code).send(result);
        } catch (e) {
            
        }
    }

    async getOfficeById (req, res) {
        try {

        } catch (e) {

        }
    }

    async getAllOffices (req, res) {
        try {

        } catch (e) {

        }
    }

    async updateOfficeById (req, res) {
        try {

        } catch (e) {

        }
    }

    async deleteOfficeById (req, res) {
        try {

        } catch (e) {

        }
    }
}

module.exports = new OfficeController()
