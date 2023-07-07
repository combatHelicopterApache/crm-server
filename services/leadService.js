const Lead = require("../models/leadModel");
const bcrypt = require("bcrypt");
const Response = require("../common/responseMessages");
const LeadDTO = require('../dtos/leadDto')
const mongoose = require("mongoose");
const generateUid = require('../helpers/generateUid')

class LeadService {

    async createNewLead(ip, data) {
        try {
            const {
                first_name,
                last_name,
                phone,
                email,
                affiliate,
                password,
                source,
                ip,
                geo,
                funnel_name,
                client_type,
                company_id,
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
            } = data




            const saltPass = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, saltPass);
            // Find the last element based on a field representing the ordering or timestamp

            const lastItem = await Lead.findOne({}, 'created_at uid').sort({ created_at: -1 })

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
                company_id,
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
                    $addFields: {
                        id: '$_id',
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
                    $addFields: {
                        comments_list: {
                            $ifNull: ['$comments_list', {}]
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

    async getAll(company_id) {
        try {
            // const limit = per_page || 25;
            // const skip = (page - 1) * per_page;

            const pipelineAll = [
                {
                    $match: {
                        company_id: new mongoose.Types.ObjectId(company_id)
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
                    $addFields: {
                        id: '$_id',
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
                        path: '$comments_list',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $addFields: {
                        comments_list: {
                            $ifNull: ['$comments_list', {}]
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

            const leads = await Lead.aggregate(pipelineAll).exec()


            if (leads) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("leads", true),
                    data: leads
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

    async deleteById(id) {
        try {
            const deleted = await Lead.findByIdAndDelete(id)

            if (deleted) {
                return {
                    status: true,
                    code: 200,
                    message: Response.delete("lead", true),
                    data:  LeadDTO.leadObject(deleted)
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