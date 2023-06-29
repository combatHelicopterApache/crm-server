const Group = require('../models/groupModel')
const Response = require("../common/responseMessages");


class GroupService {
    async createNewGroup (data) {
        try {
            const getTimestampInSeconds = () => {
                return Math.floor(Date.now() / 1000)
            }
            const { title_en, code, users_uid } = data
            const group = await new Group({ uid: getTimestampInSeconds(), title_en, code, users_uid })
            const createdGroup = await group.save()

            if (!createdGroup) {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("status", false)
                }
            } else {
                return {
                    status: true,
                    code: 200,
                    message: Response.post("status", true),
                    data: createdGroup
                }
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getAll () {
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

                if (groups) {
                    return {
                        status: true,
                        code: 200,
                        message: Response.get("groups", true),
                        data: preparedData
                    };
                } else {
                    return {
                        status: false,
                        code: 400,
                        message: Response.search("groups", false),
                    };
                }
            } catch (e) {
                return {
                    code: 500,
                    error: e.message,
                };
            }
        }

    async getById (id) {
            try {

                const group = await Group.findOne({_id: id})

                const preparedData = [group].reduce((acc, item) =>{
                    acc.id = item?._id,
                        acc.code = item?.code,
                        acc.title = item?.title_en,
                        acc.updated_at = item?.createdAt,
                        acc.created_at = item?.updatedAt

                    return acc
                }, {})


                if (group) {
                    return {
                        status: true,
                        code: 200,
                        message: Response.get("group", true),
                        data: preparedData
                    };
                } else {
                    return {
                        status: false,
                        code: 400,
                        message: Response.search("group", false),
                        id: id,
                    };
                }

            } catch (e) {
                return {
                    code: 500,
                    error: e.message,
                };
            }
        }

    async updateById (req) {
            try {

                const filter = { _id: req.params.id }
                const update = req.body

                const updated = await Group.findByIdAndUpdate(filter, update, {
                    new: true
                })

                if (updated) {
                    return {
                        status: true,
                        code: 200,
                        message: Response.update("status", true),
                        data: updated,
                    };
                } else {
                    return {
                        status: false,
                        code: 400,
                        message: Response.update("status", false),
                    };
                }

            } catch (e) {
                return {
                    code: 500,
                    error: e.message,
                };
            }
        }

    async deleteById (id) {
            try {
                const deleted = await Group.findByIdAndDelete(id)

                if (deleted) {
                    return {
                        status: true,
                        code: 200,
                        message: Response.delete("status", true),
                        data: deleted,
                    };
                } else {
                    return {
                        status: false,
                        code: 400,
                        message: Response.delete("status", false),
                    };
                }
            } catch (e) {
                return {
                    code: 500,
                    error: e.message,
                };
            }
        }

}


module.exports = new GroupService()