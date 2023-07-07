const statusService = require("../services/statusService");

class StatusController {
    async createNewStatus (req, res) {
        try {
            const result = await statusService.createNew(req)

            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async changeLeadStatus (req, res) {
        try {
            const result = await statusService.changeStatus(req)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getStatuses (req, res) {
        try {
            const result = await statusService.getAll(req.company_id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async getStatusesList (req, res) {
        try {
            const result = await statusService.getList(req.company_id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async getStatusById (req, res) {
        try {
            const result = await statusService.getById(req.params.id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async updateStatusById (req, res) {
        try {
            const filter = {_id: req.params.id}
            const update = req.body

            const result = await statusService.updateById(filter, update)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    async deleteStatusById (req, res) {
        try {
            const result = await statusService.deleteById(req.params.id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new StatusController()