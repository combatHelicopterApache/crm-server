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

    leadObject(item) {
        return  {
            id: item._id,
            uid : item.uid,
            first_name : item.first_name,
            last_name : item.last_name,
            phone : item.phone,
            email : item.email,
            affiliate :item.affiliate,
            password :item.password,
            source : item.source,
            ip : item.ip,
            geo :item.geo,
            funnel_name: item.funnel_name,
            manager: item.manager,
            assigned_to : item.assigned_to,
            status_id : item?.status_id,
            status : item?.status ? StatusDTO.statusObject(item?.status) : null,
            brand : item?.brand ? BrandsDTO.brandObject(item?.brand): null,
            client_type : item.client_type,
            calls : item.calls,
            comments : item?.comments_list ? CommentsDTO.commentObject(item?.comments_list) : null,
            logs : item.logs,
            payments : item.payments,
            created_at : item.createdAt,
            updated_at : item.updatedAt,
        }
    }

}

module.exports = new LeadDTO();
