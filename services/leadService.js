const Lead = require("../models/leadModel");
const bcrypt = require("bcrypt");
const Response = require("../common/responseMessages");
const LeadDTO = require('../dtos/leadDto')
const mongoose = require("mongoose");

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


            const createdLead = await new Lead({
                uid: Math.floor(Date.now() / 1000),
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
                    $addFields: {
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
                                as: 'manager',
                                in: {
                                    id: '$$manager._id',
                                    full_name: '$$manager.full_name'
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

                        comments: {
                            $map: {
                                input: '$comments_list',
                                as: 'cl',
                                in: {
                                    id: '$$cl._id',
                                    path: '$$cl.path'
                                }
                            }
                        },
                    }
                },
                {
                    $unwind: '$brand'
                },
                {
                    $unwind: '$status'
                },
                {
                    $unwind: '$manager'
                },
                {
                    $unwind: '$comments_list'
                },
                {
                    $project: {
                        __v: 0,
                        password: 0,
                    }
                }
            ];
            const lead = await Lead.aggregate(pipeline)

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
            console.log(company_id)
            const pipeline = [
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
                                as: 'manager',
                                in: {
                                    id: '$$manager._id',
                                    full_name: '$$manager.full_name'
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

                        comments: {
                            $map: {
                                input: '$comments_list',
                                as: 'cl',
                                in: {
                                    id: '$$cl._id',
                                    path: '$$cl.path'
                                }
                            }
                        },
                    }
                },
                {
                    $unwind: '$brand'
                },
                {
                    $unwind: '$status'
                },
                {
                    $unwind: '$manager'
                },
                {
                    $unwind: '$comments_list'
                },
                {
                    $project: {
                        __v: 0,
                        password: 0,
                    }
                }
            ];

            const leads = await Lead.aggregate(pipeline)

            // console.log(leads)
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