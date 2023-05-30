const Lead = require("../models/leads/leads");
const customError = require("../common/errors");


const CreateNewLeadService = async (ip, data) => {
    try {
        const {
            first_name,
            last_name,
            phone,
            email,
            affiliate,
            source,
            manager,
            status,
            balance,
            comment
        } = data

        const ips = ['::1']

        const getTimestampInSeconds = () => {
            return Math.floor(Date.now() / 1000)
        }

        if (ips.includes(ip)) {
            const createdLead = await new Lead({
                uid: getTimestampInSeconds(),
                first_name,
                last_name,
                phone,
                email,
                affiliate,
                source,
                manager,
                status,
                balance,
                comment
            })


            const createdLeadSave = await createdLead.save()

            if (!createdLeadSave) {
                return {status: false, message: customError.lead.failed.add}
            } else {
                return {
                    status: true,
                    message: customError.lead.success.add,
                    lead: await createdLeadSave
                }
            }
        } else {
            return {status: 'denied', message: customError.ip.error}
        }
    } catch (err) {
        throw new Error(customError.server.error)
    }
}

const GetLeadByIdService = async (id) => {
    try {
        const lead = await Lead.findOne({_id: id})
        if (!lead) {
            return {status: false, message: customError.lead.common.search.failed}
        } else {
            return {
                status: true,
                message: customError.lead.common.search.success,
                lead: await lead
            }
        }
    } catch (err) {
        throw new Error(customError.server.error)
    }
}

const GetLeadsService = async () => {
    try {
        const leads = await Lead.find().sort({"createdAt": -1})
        const preparedData = leads.reduce((acc, item) => {
            acc.push({
                id: item._id,
                uid: item.uid,
                first_name: item.first_name,
                last_name: item.last_name,
                phone: item.phone,
                email: item.email,
                affiliate: item.affiliate,
                source: item.source,
                manager: item.manager,
                balance: item.balance,
                status: item.status,
                comment: item.comment,
                updated_at: item?.createdAt ?? null,
                created_at: item?.updatedAt ?? null
            })

            return acc
        }, [])

        if (!preparedData) {
            return {status: false, message: customError.lead.failed.get}
        } else {
            return {
                status: true,
                message: customError.lead.success.get,
                leadData: await preparedData
            }
        }

    } catch (err) {
        throw new Error(customError.server.error)
    }
}

const UpdateLeadByIdService = async (filter, update) => {

    try {
        const resUpdate = await Lead.findByIdAndUpdate(filter, update, {
            new: true
        })

        if (!resUpdate) {
            return {status: false, message: customError.lead.failed.update}
        } else {
            return {status: true, message: customError.lead.success.update}
        }
    } catch {
        throw new Error(customError.server.error)
    }
}

const DeleteLeadByIdService = async (id) => {
    try {
        const resDelete = await Lead.findByIdAndDelete(id)

        if (!resDelete) {
            return {status: false, message: customError.lead.failed.delete}
        } else {
            return {status: true, message: customError.lead.success.delete}
        }

    } catch (err) {
        throw new Error(customError.server.error)
    }
}

module.exports = {
    GetLeadsService,
    GetLeadByIdService,
    CreateNewLeadService,
    UpdateLeadByIdService,
    DeleteLeadByIdService
}