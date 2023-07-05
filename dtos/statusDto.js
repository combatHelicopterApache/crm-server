class StatusDTO {
    statusArray(data) {
        return data.reduce((acc, item) => {
            acc.push({
                id: item._id,
                title: item.title,
                color: item.color,
                order: item.order,
                default_status: item.default_status,
                created_by_id: item.created_by_id,
                updated_by_id: item.updated_by_id,
                company_id: item.company_id,
                created_at: item.created_at,
                updated_at: item.updated_at,
            });
            return acc;
        }, []);
    }
    statusObject(data) {
         return {
             id: data._id,
             title: data.title,
             color: data.color,
             order: data.order,
             default_status: data.default_status,
             created_by_id: data.created_by_id,
             updated_by_id: data.updated_by_id,
             company_id: data.company_id,
             created_at: data.created_at,
             updated_at: data.updated_at
         }
    }
}

module.exports = new StatusDTO();
