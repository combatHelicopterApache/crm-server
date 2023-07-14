const leadService = require('../services/leadService')
const statusService = require('../services/statusService')


class LeadController {
    async createNewLead(req, res) {
        try {
            const result = await leadService.createNewLead(req)
            if (!result) {
                return res.status(result.code).send(result);
            }
            const status = await statusService.createStatusLog(result.data.id, req.user.id, req.company_id)
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
            const result = await leadService.getAll(req)
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

    async changeLeadAssign(req, res) {
        try {

            const result = await leadService.changeAssign(req.body)

            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async changeLeadType(req, res) {
        try {
            const result = await leadService.changeType(req.body)

            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async changeLeadBrand(req, res) {
        try {
            const result = await leadService.changeBrand(req.body)

            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async uploadLeadsMassive(req, res) {
        try {
            const result = await leadService.uploadLeads(req.body)

            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
}


module.exports = new LeadController()