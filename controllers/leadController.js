const leadService = require('../services/leadService')


class LeadController {
    async createNewLead (req, res) {
        try {
            const result = await leadService.createNewLead(req.connection.remoteAddress, req.body)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getLeads (req, res) {
        try {
            const result = await leadService.getAll()
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getLeadById (req, res) {
        try {
            const result = await leadService.getById(req.params.id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }


    async updateLeadById (req, res) {
        try {
            const filter = {_id: req.params.id}
            const update = req.body

            const result = await leadService.updateById(filter, update)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async deleteLeadById (req, res) {
        try {
            const result = await leadService.deleteById(req.params.id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}


module.exports = new LeadController()