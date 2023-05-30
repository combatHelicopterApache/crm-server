const customError = require('../../common/errors')
const leadService = require('../../services/leadsService')

const CreateNewLead = async (req, res) => {
    try {
        const result = await leadService.CreateNewLeadService(req.connection.remoteAddress, req.body)

        if(result.status === 'denied' ) {
            return res.status(403).json(result)
        }
        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }
    } catch (err) {
        return res.status(500).json({message: customError.server.error, error: err})
    }
}

const GetLeads = async (req, res) => {
    try {
        const result = await leadService.GetLeadsService()
        if(!result) {
            return res.status(400).json(result)
        }

        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }

    } catch (err) {
        return res.status(500).json({message: customError.server.error, error: err})
    }
}

const GetLeadById = async (req, res) => {
    try {
        const result = await leadService.GetLeadByIdService(req.params.id)
        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }
    } catch (err) {
        return res.status(500).json({message: customError.server.error, error: err})
    }
}


const UpdateLeadByID = async (req, res) => {
    try {
        const filter = {_id: req.params.id}
        const update = req.body

        const result = await leadService.UpdateLeadByIdService(filter, update)

        if (!result) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }

    } catch (err) {
        return res.status(500).json({message: customError.server.error, error: err})
    }
}

const DeleteLeadByID = async (req, res) => {
    try {
        const result = await leadService.DeleteLeadByIdService(req.params.id)

        if (result) {
            return res.status(200).json(result)
        } else {
            return res.status(400).json(result)
        }

    } catch (err) {
        return res.status(500).json({message: customError.server.error, error: err})
    }
}

module.exports = {
    CreateNewLead,
    GetLeads,
    GetLeadById,
    UpdateLeadByID,
    DeleteLeadByID
}