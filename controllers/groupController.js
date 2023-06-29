const groupServices = require('../services/groupService')


class GroupController {
    async CreateNewGroup(req, res) {
        try {
            const result = await groupServices.createNewGroup(req.body)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async GetGroups(req, res) {
        try {
            const result = await groupServices.getAll()
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async GetGroupById(req, res) {
        try {
            const result = await groupServices.getById(req.params.id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async UpdateGroupByID(req, res) {
        try {
            const result = await groupServices.updateById(req)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async DeleteGroupByID(req, res) {
        try {
            const result = await groupServices.deleteById(req.params.id)
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
}

module.exports = new GroupController()