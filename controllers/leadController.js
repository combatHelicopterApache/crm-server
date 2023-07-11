const leadService = require('../services/leadService')
const statusService = require('../services/statusService')


class LeadController {
    async createNewLead(req, res) {
        try {
            const result = await leadService.createNewLead(req)
            if (!result) {
                return res.status(result.code).send(result);
            }
            const status = await statusService.createStatusLog(result.data.id, req.user.id, result.data.status_id)
            if (!status) {
                return res.status(result.code).send(result);
            }
            return res.status(result.code).send({result, status});
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async getLeads(req, res) {
        try {
            const result = await leadService.getAll(req.company_id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async getLeadById(req, res) {
        try {
            const result = await leadService.getById(req.params.id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }


    async updateLeadById(req, res) {
        try {
            const filter = {_id: req.params.id}
            const update = req.body

            const result = await leadService.updateById(filter, update)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async deleteLeadById(req, res) {
        try {
            const result = await leadService.deleteById(req.params.id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async changeLeadStatus(req, res) {
        try {

            const result = await leadService.changeStatus(req)

            const setStatusLog = await statusService.pushElementToStatusLog(result.data.id, req.user, result.data.prev_status_id, req.body.status_id)

            return res.status(result.code).send(setStatusLog);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
}


module.exports = new LeadController()