const Status = require("../models/statusModel");
const Response = require("../common/responseMessages");
const StatusDto = require('../dtos/statusDto')

class StatusService {
    async createNew(data) {
        try {
            const {
                title,
                color,
                order,

            } = data

            const candidate = await Status.findOne({title: title})
            if(candidate) return {
                status: false,
                code: 400,
                message: Response.exists("title", title)
            }

            const createdStatus = await new Status({
                title,
                color,
                order,
            })

            const createdStatusSave = await createdStatus.save()

            if (!createdStatusSave) {
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
                    data: StatusDto.statusObject(createdStatusSave)
                }
            }

        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getById(id) {
        try {
            const status = await Status.findById({_id: id})


            if (status) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("status", true),
                    data: StatusDto.statusObject(status)
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search("status", false),
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

    async getAll() {
        try {
            const statuses = await Status.find().sort({"createdAt": -1})

            if (statuses) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("statuses", true),
                    data: StatusDto.statusArray(statuses)
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search("statuses", false),
                };
            }

        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async updateById(filter, update) {

        try {
            const updated = await Status.findByIdAndUpdate(filter, update, {
                new: true
            })

            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update("status", true),
                    data: StatusDto.statusObject(updated),
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

    async deleteById(id) {
        try {
            const deleted = await Status.findByIdAndDelete(id)

            if (deleted) {
                return {
                    status: true,
                    code: 200,
                    message: Response.delete("status", true),
                    data: StatusDto.statusObject(deleted),
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

module.exports = new StatusService()