const StatusDTO = require('./statusDto')
const BrandsDTO = require('./brandDto')
const CommentsDTO = require('./commentDto')
class LeadDTO {
    leadArray(data) {
        return data.reduce((acc, item) => {
            acc.push({
                id: item._id,
                uid: item.uid,
                first_name: item.first_name,
                last_name: item.last_name,
                phone: item.phone,
                email: item.email,
                affiliate: item.affiliate,
                source: item.source,
                ip: item.ip,
                geo: item.geo,
                funnel_name: item.funnel_name,
                manager: item.manager,
                status: StatusDTO.statusObject(item?.status),
                brand : BrandsDTO.brandArray(item?.brand),
                client_type: item.client_type,
                calls: item.calls,
                comments: CommentsDTO.commentObject(item.comments_list),
                logs: item.logs,
                payments: item.payments,
                created_at: item.createdAt,
                updated_at: item.updatedAt,
            });
            return acc;
        }, []);
    }

    leadObject(data) {
        return data.reduce((acc, item) => {
            acc.id = item?._id;
            acc.uid = item.title;
            acc.first_name = item.first_name;
            acc.last_name = item.last_name;
            acc.phone = item.phone;
            acc.email = item.email;
            acc.affiliate = item.affiliate;
            acc.password = item.password;
            acc.source = item.source;
            acc.ip = item.ip;
            acc.geo = item.geo;
            acc.funnel_name = item.funnel_name;
            acc.manager = item.manager;
            acc.status = StatusDTO.statusObject(item?.status);
            acc.brand = BrandsDTO.brandObject(item?.brand);
            acc.client_type = item.client_type;
            acc.calls = item.calls;
            acc.comments = CommentsDTO.commentObject(item?.comments_list);
            acc.logs = item.logs;
            acc.payments = item.payments;
            acc.created_at = item.createdAt;
            acc.updated_at = item.updatedAt;
            return acc;
        }, {});
    }

}

module.exports = new LeadDTO();
