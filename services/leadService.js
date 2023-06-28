const Lead = require("../models/leadModel");
const bcrypt = require("bcrypt");
const Response = require("../common/responseMessages");

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
                manager_id,
                manager_name,
                status_id,
                status_name,
                brand_id,
                brand_name,
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
                manager_name,
                status_id,
                status_name,
                brand_id,
                brand_name,
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
                    data: createdLeadSave
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
            const lead = await Lead.findById({_id: id})


            if (lead) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("lead", true),
                    data: lead,
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

    async getAll() {
        try {
            const leads = await Lead.find().sort({"createdAt": -1})

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
                    data: updated,
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
                    data: deleted,
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