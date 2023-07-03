const StatusDTO = require('./statusDto')
const BrandsDTO = require('./brandDto')
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
                password: item.password,
                source: item.source,
                ip: item.ip,
                geo: item.geo,
                funnel_name: item.funnel_name,
                manager_id: item.manager_id,
                manager_name: item.manager_name,
                status: StatusDTO.statusObject(item?.status),
                brand : BrandsDTO.brandArray(item?.brand),
                client_type: item.client_type,
                calls: item.calls,
                comments: item.comments,
                logs: item.logs,
                payments: item.payments,
                created_at: item.created_at,
                updated_at: item.updated_at,
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
            acc.manager_id = item.manager_id;
            acc.manager_name = item.manager_name;
            acc.status = StatusDTO.statusObject(item?.status);
            acc.brand = BrandsDTO.brandObject(item?.brand);
            acc.client_type = item.client_type;
            acc.calls = item.calls;
            acc.comments = item.comments;
            acc.logs = item.logs;
            acc.payments = item.payments;

            acc.created_at = item.created_at;
            acc.updated_at = item.updated_at;
            return acc;
        }, {});
    }
}

module.exports = new LeadDTO();
