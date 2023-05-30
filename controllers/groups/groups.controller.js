const customError = require('../../common/errors')
const groupServices = require('../../services/groupsService')

const CreateNewGroup = async (req, res) => {
    try {
        const result = await groupServices.CreateNewGroupService(req.body)

        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }
    } catch ( err ) {
        return res.status(500).json({
            message: customError.server.error,
            server: err
        })
    }
}

const GetGroups = async (req, res) => {
    try {
        const result = await groupServices.GetGroupsService()

        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }
    } catch ( err ) {
        return res.status(500).json({message: customError.server.error, error: err})
    }
}

const GetGroupById = async (req, res) => {
    try {
        const result = await groupServices.GetGroupByIdService(req.params.id)

        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }
    } catch ( err ) {
        return res.status(500).json({message: customError.server.error, error: err})
    }
}


const UpdateGroupByID = async (req, res) => {
    try {

        const result = await groupServices.UpdateGroupByIdService(req)

        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }

    } catch ( err ) {
        return res.status(500).json({
            message: customError.server.error,
            server: err
        })
    }
}


const DeleteGroupByID = async (req, res) => {
    try {
        const result = await groupServices.DeleteGroupByIdService(req.params.id)

        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }

    } catch ( err ) {
        return res.status(500).json({message: customError.server.error, error: err})
    }
}


module.exports = {
    CreateNewGroup,
    GetGroups,
    GetGroupById,
    UpdateGroupByID,
    DeleteGroupByID
}