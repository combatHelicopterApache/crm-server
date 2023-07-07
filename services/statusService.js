const Status = require("../models/statusModel");
const StatusLog = require("../models/statusLogModel");
const Response = require("../common/responseMessages");
const StatusDto = require('../dtos/statusDto')

class StatusService {
    async createNew(data) {
        try {
            const {
                title,
                color,
                order,
            } = data.body

            const {id} = data.user

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
                created_by_id: id,
                company_id: data.company_id
            })

            const createdStatusSave = await createdStatus.save()

            if (!createdStatusSave) {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("status", false),
                    data: StatusDto.statusObject(createdStatusSave)
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

    async getList(company_id) {
        try {

            const companyStatuses = await Status.find({ company_id }, 'id title color order')

            if (companyStatuses) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("statuses", true),
                    data: StatusDto.statusArray(companyStatuses)
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

    async getAll(company_id) {
        try {

            const companyStatuses = await Status.find({ company_id })

            if (companyStatuses) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("statuses", true),
                    data: StatusDto.statusArray(companyStatuses)
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

    async createStatusLog(lead_id, user_id) {
        try {

            const createStatus = await new StatusLog({
                lead_id: lead_id,
                statuses: [
                    {
                        created_by: user_id,
                        description: '',
                        prev_status_id: null,
                        prev_status_title: null,
                        curr_status_id: 1,
                        curr_status_title: 'NEW',

                    }
                ]
            })

            const created = await createStatus.save()
            if (created) {
                return {
                    status: true,
                    code: 200,
                    message: Response.post("status log", true),
                    data: created
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("status log", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }
    //
    // async createStatusStatusLog(data) {
    //     try {
    //
    //         const createStatus = await new StatusLog({
    //             lead_id: data.params.id,
    //             statuses: [
    //                 {
    //                     created_by: data.user.id,
    //                     description: data.body.description,
    //                     prev_status_id: data.body.,
    //                     prev_status_title: l,
    //                     curr_status_id: l,
    //                     curr_status_title: l,
    //
    //                 }
    //             ]
    //         })
    //
    //         const created = createStatus.save()
    //
    //     } catch (e) {
    //         return {
    //             code: 500,
    //             error: e.message,
    //         };
    //     }
    // }




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