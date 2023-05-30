const Group = require('../models/groups/groups')
const customError = require('../common/errors')

const CreateNewGroupService = async (data) => {
    try {
        const getTimestampInSeconds = () => {
            return Math.floor(Date.now() / 1000)
        }
        const { title_en, code, users_uid } = data
        const group = await new Group({ uid: getTimestampInSeconds(), title_en, code, users_uid })
        const createdGroup = await group.save()

        if (!createdGroup) {
            return {status: false, message: customError.group.failed.add}
        } else {
            return {status: true, message: customError.group.success.add, groups: createdGroup }
        }
    } catch (err) {
        throw new Error(customError.server.error)
    }
}

const GetGroupsService = async () => {
    try {
        const groups = await Group.find().sort({"priority": 1})
        const preparedData = groups.reduce((acc, item) => {
            acc.push({
                id: item._id,
                code: item.code,
                title: item.title_en,
                updated_at: item?.createdAt,
                created_at: item?.updatedAt
            })

            return acc
        }, [])

        if (!groups) {
            return {status: false, message: customError.group.common.search.failed}
        } else {
            return {status: true, message: customError.group.common.search.success, group: await preparedData}
        }
    } catch (err) {
        throw new Error(customError.server.error)
    }
}

const GetGroupByIdService = async (id) => {
    try {

        const group = await Group.findOne({_id: id})

            const preparedData = [group].reduce((acc, item) => {
                    acc.id = item?._id,
                    acc.code = item?.code,
                    acc.title = item?.title_en,
                    acc.updated_at = item?.createdAt,
                    acc.created_at = item?.updatedAt

                return acc
            }, {})

        if (!group) {
            return {status: false, message: customError.group.common.search.failed}
        } else {
            return {status: true, message: customError.group.common.search.success, group: await preparedData}
        }

    } catch (err) {
        throw new Error(customError.server.error)
    }
}


const UpdateGroupByIdService = async (req) => {
    try {

        const filter = { _id: req.params.id }
        const update = req.body

        const resUpdate = await Group.findByIdAndUpdate(filter, update, {
            new: true
        })

        if (!resUpdate) {
            return {status: false, message: customError.group.failed.update}
        } else {
            return {status: true, message: customError.group.success.update, group: resUpdate}
        }

    } catch (err) {
        throw new Error(customError.server.error)
    }
}

const DeleteGroupByIdService = async (id) => {
    try {
        const resDelete = await Group.findByIdAndDelete(id)

        if (!resDelete) {
            return {status: false, message: customError.group.failed.delete, group: await resDelete}
        } else {
            return {status: true, message: customError.group.success.delete}
        }
    } catch (err) {
        throw new Error(customError.server.error)
    }
}


module.exports = {
    CreateNewGroupService,
    GetGroupsService,
    GetGroupByIdService,
    UpdateGroupByIdService,
    DeleteGroupByIdService
}