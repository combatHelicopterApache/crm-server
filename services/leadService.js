const Lead = require("../models/leadModel");
const bcrypt = require("bcrypt");
const Response = require("../common/responseMessages");
const LeadDTO = require('../dtos/leadDto')
const mongoose = require("mongoose");
const generateUid = require('../helpers/generateUid')
const customFilter = require('../helpers/filters')

class LeadService {

    async createNewLead(data) {
        try {
            const {
                first_name,
                last_name,
                phone,
                email,
                affiliate,
                source,
                ip,
                geo,
                assigned_to,
                funnel_name,
                client_type,
                manager_id,
                status_id,
                brand_id,
                calls,
                comments,
                logs,
                payments,
                deposits,
                withdrawals,
                accounts,
                cfd_orders,
                documents
            } = data.body


            const saltPass = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(process.env.DEFAULT_LEAD_PASSWORD, saltPass);

            // Find the last element based on a field representing the ordering or timestamp
            const lastItem = await Lead.findOne({}, 'created_at uid').sort({created_at: -1})


            const createdLead = await new Lead({
                uid: generateUid(lastItem),
                first_name,
                last_name,
                phone,
                email,
                affiliate,
                password: hashedPass,
                source,
                ip,
                geo,
                funnel_name,
                manager_id,
                assigned_to,
                created_by: data.user.id,
                company_id: data?.company_id,
                status_id,
                brand_id,
                client_type,
                calls,
                comments,
                logs,
                payments,
                deposits,
                withdrawals,
                accounts,
                cfd_orders,
                documents
            })

            const createdLeadSave = await createdLead.save()


            if (!createdLeadSave) {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("lead", false)
                }
            } else {
                return {
                    status: true,
                    code: 200,
                    message: Response.post("lead", true),
                    data: LeadDTO.leadObject(createdLeadSave)
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

            const pipeline = [
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'statuses',
                        localField: 'status_id',
                        foreignField: '_id',
                        as: 'status'
                    }
                },
                {
                    $lookup: {
                        from: 'brands',
                        localField: 'brand_id',
                        foreignField: '_id',
                        as: 'brand'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'manager_id',
                        foreignField: '_id',
                        as: 'manager'
                    }
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: 'elem_id',
                        as: 'comments_list'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: 'assigned_to',
                        as: 'assigned_to'
                    }
                },
                {
                    $lookup: {
                        from: 'statuslogs',
                        localField: '_id',
                        foreignField: 'lead_id',
                        as: 'status_log_list'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'created_by',
                        foreignField: '_id',
                        as: 'created_by'
                    }
                },
                {
                    $addFields: {
                        id: '$_id',
                        created_by: '$created_by.full_name',
                        brand: {
                            $map: {
                                input: '$brand',
                                as: 'br',
                                in: {
                                    id: '$$br._id',
                                    title: '$$br.title',
                                    active: '$$br.active'
                                },
                            },

                        },
                        assigned_to: {
                            $map: {
                                input: '$assigned_to',
                                as: 'at',
                                in: {
                                    id: '$$at._id',
                                    full_name: '$$at.full_name'
                                }
                            }
                        },
                        manager: {
                            $map: {
                                input: '$manager',
                                as: 'mg',
                                in: {
                                    id: '$$mg._id',
                                    full_name: '$$mg.full_name'
                                }
                            }
                        },
                        status: {
                            $map: {
                                input: '$status',
                                as: 'st',
                                in: {
                                    id: '$$st._id',
                                    title: '$$st.title',
                                    color: '$$st.color',
                                    order: '$$st.order'
                                }
                            }
                        },
                        comments_list: {
                            $map: {
                                input: '$comments_list',
                                as: 'cl',
                                in: {
                                    id: '$$cl._id',
                                    path: '$$cl.path',
                                    elem_id: '$$cl.elem_id',
                                    commentary_list: {
                                        $map: {
                                            input: '$$cl.comments',
                                            as: 'comment',
                                            in: {
                                                user_id: '$$comment.user_id',
                                                user_name: '$$comment.user_name',
                                                description: '$$comment.description',
                                                deleted_by: '$$comment.deleted_by',
                                                deleted_by_name: '$$comment.deleted_at',
                                                deleted_at: '$$comment.deleted_at',
                                                updated_by: '$$comment.updated_by',
                                                updated_by_name: '$$comment.updated_by_name',
                                                updated_at: '$$comment.updated_at',
                                                id: '$$comment._id'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        status_log_list: {
                            $map: {
                                input: '$status_log_list',
                                as: 'sll',
                                in: {
                                    id: '$$sll._id',
                                    lead_id: '$$sll.lead_id',
                                    status_list: {
                                        $map: {
                                            input: '$$sll.statuses',
                                            as: 'status_log',
                                            in: {
                                                created_by: '$$status_log.created_by',
                                                description: '$$status_log.description',
                                                prev_status_id: '$$status_log.prev_status_id',
                                                prev_status_title: '$$status_log.prev_status_title',
                                                curr_status_id: '$$status_log.curr_status_id',
                                                curr_status_title: '$$status_log.curr_status_title',
                                                id: '$$status_log._id'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    }
                },
                {
                    $unwind: {
                        path: '$brand',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$status',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$manager',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$assigned_to',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$comments_list',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $unwind: {
                        path: '$status_log_list',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $addFields: {
                        comments_list: {
                            $ifNull: ['$comments_list', {}]
                        },
                        status_log_list: {
                            $ifNull: ['$status_log_list', {}]
                        },
                        assigned_to: {
                            $ifNull: ['$assigned_to', null]
                        },
                        status: {
                            $ifNull: ['$status', {}]
                        }
                    }
                },

                {
                    $project: {
                        _id: 0,
                        __v: 0,
                        password: 0,
                    }
                },

            ];
            const [lead] = await Lead.aggregate(pipeline).exec()

            if (lead) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("lead", true),
                    data: lead
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search("lead", false),
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

    async getAll(data) {
        try {
            const timeStart = new Date()
            const {page, sort_field, order, per_page} = data.query
            const pageNumber = page || 1
            const limit = Number(per_page) || 20;
            const skip = (page - 1) * per_page || 0;

            const sortOptions = {};

            if (sort_field && order) {
                sortOptions[sort_field] = order === "desc" ? -1 : 1;
            } else {
                sortOptions['created_at'] = 'desc'
            }

            const filterOptions = customFilter('leads', data.query, data.company_id)


            const pipelineAll = [
                {
                    $match: {
                        $and: filterOptions
                    }
                },
                {
                    $lookup: {
                        from: 'statuses',
                        let: {status_id: '$status_id'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ['$_id', '$$status_id']}
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    id: '$_id',
                                    title: 1,
                                    color: 1,
                                    order: 1
                                }
                            }
                        ],
                        as: 'status'
                    }
                },
                {
                    $lookup: {
                        from: 'brands',
                        let: {brand_id: '$brand_id'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ['$_id', '$$brand_id']}
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    id: '$_id',
                                    title: 1,
                                    active: 1
                                }
                            }
                        ],
                        as: 'brand'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        let: {manager_id: '$manager_id'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ['$_id', '$$manager_id']}
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    id: '$_id',
                                    full_name: 1
                                }
                            }
                        ],
                        as: 'manager'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        let: {created_by: '$created_by'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ['$_id', '$$created_by']}
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    id: '$_id',
                                    full_name: 1
                                }
                            }
                        ],
                        as: 'created_by'
                    }
                },

                {
                    $lookup: {
                        from: 'comments',
                        let: {elem_id: '$_id'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {$eq: ['$elem_id', '$$elem_id']}
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    path: 1,
                                    elem_id: 1,
                                    comments: {
                                        $map: {
                                            input: '$comments',
                                            as: 'comment',
                                            in: {
                                                user_id: '$$comment.user_id',
                                                user_name: '$$comment.user_name',
                                                description: '$$comment.description',
                                                deleted_by: '$$comment.deleted_by',
                                                deleted_by_name: '$$comment.deleted_at',
                                                deleted_at: '$$comment.deleted_at',
                                                updated_by: '$$comment.updated_by',
                                                updated_by_name: '$$comment.updated_by_name',
                                                updated_at: '$$comment.updated_at',
                                                id: '$$comment._id'
                                            }
                                        }
                                    }
                                }
                            }
                        ],
                        as: 'comments_list'
                    }
                },
                {
                    $addFields: {
                        id: '$_id',
                        created_by: {$arrayElemAt: ['$created_by.full_name', 0]},
                        brand: {$arrayElemAt: ['$brand', 0]},
                        manager: {$arrayElemAt: ['$manager', 0]},
                        status: {$arrayElemAt: ['$status', 0]},
                        comments_list: {$arrayElemAt: ['$comments_list', 0]}
                    }
                },

                {
                    $project: {
                        _id: 0,
                        __v: 0,
                        password: 0,
                        company_id: 0,
                        manager_id: 0,
                        status_id: 0,
                        payments: 0,
                        comment_id: 0,
                        brand_id: 0,
                        logs: 0,
                    }
                }

            ];
            const leads = await Lead.aggregate(pipelineAll)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .exec()

            const endStart = new Date()
            const totalTime = `${(endStart - timeStart) / 1000}s`

            console.log(totalTime)

            const total = await Lead.countDocuments();
            if (leads) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("leads", true),
                    time: totalTime,
                    data: leads,
                    meta: {
                        page: pageNumber,
                        per_page: limit,
                        found: leads.length,
                        total,
                    },
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.search("leads", false),
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
            const updated = await Lead.findByIdAndUpdate(filter, update, {
                new: true
            })

            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update("lead", true),
                    data: LeadDTO.leadObject(updated)
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.update("lead", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async changeStatus(data) {

        try {

            const {lead_id, status_id} = data.body

            const leadStatus = await Lead.findOne({_id: new mongoose.Types.ObjectId(lead_id)}, 'status_id')

            const updated = await Lead.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(lead_id)
            }, {status_id: status_id}, {
                new: true
            })
            // console.log(updated)
            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update("lead", true),
                    data: {...LeadDTO.leadObject(updated), prev_status_id: leadStatus}
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.update("lead", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async changeAssign(data) {

        try {

            const {lead_id, assign_to} = data

            const updated = await Lead.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(lead_id)
            }, {assigned_to: assign_to}, {
                new: true
            })
            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update("lead", true),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.update("lead", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }


    async changeType(data) {

        try {
            const {lead_id, client_type} = data

            const updated = await Lead.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(lead_id)
            }, {client_type}, {
                new: true
            })

            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update("lead", true),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.update("lead", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async changeBrand(data) {

        try {
            const {lead_id, brand_id} = data

            const updated = await Lead.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(lead_id)
            }, {brand_id}, {
                new: true
            })

            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update("lead", true),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.update("lead", false),
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
            const deleted = await Lead.findByIdAndDelete(id)

            if (deleted) {
                return {
                    status: true,
                    code: 200,
                    message: Response.delete("lead", true),
                    data: LeadDTO.leadObject(deleted)
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.delete("lead", false),
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

module.exports = new LeadService()