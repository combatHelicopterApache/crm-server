const Status = require("../models/statusModel");
const StatusLogModel = require("../models/statusLogModel");
const Response = require("../common/responseMessages");
const StatusDto = require('../dtos/statusDto')
const User = require("../models/userModel");
const Lead = require("../models/leadModel");
const mongoose = require("mongoose");
const commentModel = require("../models/commentModel");
const CommentDTO = require("../dtos/commentDto");

class StatusService {
    async createNew(data) {
        try {
            const {
                title,
                color,
                order,
            } = data.body

            const {id} = data.user

            const candidate = await Status.findOne({title: title, company_id: data.company_id})

            // console.log(data)

            if(candidate) return {
                status: false,
                code: 400,
                message: Response.exists("title", title)
            }

            const createdStatus = await new Status({
                title,
                color,
                order,
                status_default: false,
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

    async createDefaultStatus(data) {
        try {

            const createdStatus = await new Status({
                status_default: true,
                created_by_id: data.user_id,
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

    async createStatusLog(lead_id, user_id, status_id) {
        try {

            const defaultStatus = await Status.findOne({
                company_id: new mongoose.Types.ObjectId(status_id),
                status_default: true
            })

            const updateLeadStatusId = await Lead.findByIdAndUpdate(
                lead_id,
                { status_id: defaultStatus._id },
                { new: true }
            )

            const createStatus = await new StatusLogModel({
                lead_id: lead_id,
                statuses: [
                    {
                        created_by: user_id,
                        description: '',
                        prev_status_id: null,
                        prev_status_title: null,
                        curr_status_id: defaultStatus._id,
                        curr_status_title: defaultStatus.title,
                    }
                ]
            })

            const created = await createStatus.save()

            if (created) {
                return {
                    status: true,
                    code: 200,
                    message: Response.post("status log", true),
                    data: StatusDto.statusLogObject(created)
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

    async pushElementToStatusLog(lead_id, user, prev_status, curr_status) {
        try {
// console.log(lead_id)
// console.log(user)
// console.log(prev_status)
// console.log('-----------------------------------')
// console.log(curr_status)
            const findExistStatusLog = await StatusLogModel.findOne({lead_id: lead_id})
            if(!findExistStatusLog) {return await this.createStatusLog(lead_id, user.id, prev_status.status_id )}

            const fullStatusDataPrev = await Status.findOne(
                { _id: prev_status.status_id },
                'title color'
            )
            if(!fullStatusDataPrev) {
                return {
                    status: false,
                    code: 400,
                    message: Response.search("status", false),
                };
            }

            const fullStatusDataCurr = await Status.findOne(
                { _id: curr_status },
                'title color'
            )
            if(!fullStatusDataCurr) {
                return {
                    status: false,
                    code: 400,
                    message: Response.search("status", false),
                };
            }

            const pushStatusLog = {
                created_by: user.id,
                description:  '',
                prev_status_id:  fullStatusDataPrev._id,
                prev_status_color:  fullStatusDataPrev.color,
                prev_status_title: fullStatusDataPrev.title,
                curr_status_id:  fullStatusDataCurr._id,
                curr_status_color:  fullStatusDataCurr.color,
                curr_status_title:  fullStatusDataCurr.title,
            }

            const added = await StatusLogModel.findOneAndUpdate(
                { lead_id: lead_id },
                { $push: { statuses: { $each: [pushStatusLog] } } },
                { new: true }).lean();

            if (added) {
                return {
                    status: true,
                    code: 200,
                    message: Response.post("status", true),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("status", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getListLog(data) {
        try {
            const {lead_id} = data.params

            const pipeline = [
                {
                    $match: {
                        lead_id: new mongoose.Types.ObjectId(lead_id)
                    }
                },
                {
                    $addFields: {
                        id: '$_id',
                        statuses: {
                            $map: {
                                input: '$statuses',
                                as: 'st',
                                in: {
                                    created_by: '$$st.created_by',
                                    description: '$$st.description',
                                    prev_status_id: '$$st.prev_status_id',
                                    prev_status_color: '$$st.prev_status_color',
                                    prev_status_title: '$$st.prev_status_title',
                                    curr_status_id: '$$st.curr_status_id',
                                    curr_status_color: '$$st.curr_status_color',
                                    curr_status_title: '$$st.curr_status_title',
                                    id: '$$st._id'
                                }
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        statuses: {
                            $ifNull: ['$statuses', []]
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'statuses.created_by',
                        foreignField: '_id',
                        as: 'users'
                    }
                },
                {
                    $addFields: {
                        statuses: {
                            $map: {
                                input: '$statuses',
                                as: 'st',
                                in: {
                                    description: '$$st.description',
                                    prev_status_id: '$$st.prev_status_id',
                                    prev_status_color: '$$st.prev_status_color',
                                    prev_status_title: '$$st.prev_status_title',
                                    curr_status_id: '$$st.curr_status_id',
                                    curr_status_color: '$$st.curr_status_color',
                                    curr_status_title: '$$st.curr_status_title',
                                    id: '$$st._id',
                                    creator: {
                                        $let: {
                                            vars: {
                                                matchedUser: {
                                                    $arrayElemAt: [
                                                        {
                                                            $filter: {
                                                                input: '$users',
                                                                cond: { $eq: ['$$this._id', '$$st.created_by'] }
                                                            }
                                                        },
                                                        0
                                                    ]
                                                }
                                            },
                                            in: {
                                                full_name: '$$matchedUser.full_name',
                                                title: '$$matchedUser.title',
                                                role_id: '$$matchedUser.role_id',
                                                user_avatar: '$$matchedUser.avatar_id',
                                                id: '$$matchedUser._id'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        __v: 0,
                        lead_id: 0,
                        users: 0
                    }
                }
            ];

            const [companyStatuses] = await StatusLogModel.aggregate(pipeline)

            if (companyStatuses) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("statuses", true),
                    data: companyStatuses.statuses
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

    async deleteById(data) {
        try {

            const statusLead = await Lead.find({
                status_id: data.params.id,
                company_id: new mongoose.Types.ObjectId(data.company_id)
            }).count()

            if(statusLead > 0) {
                return {
                    status: true,
                    code: 409,
                    message: "You cannot delete this status, it is tied to the lead",
                    count: statusLead
                };
            }

            const statusCount = await Status.find({company_id: new mongoose.Types.ObjectId(data.company_id)}).count()

            if(statusCount === 1) {
                return {
                    status: true,
                    code: 409,
                    message:"You cant delete last element",
                };
            }

            const deleted = await Status.findByIdAndDelete(data.params.id)

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