class StatusDTO {
    statusArray(data) {
        return data.reduce((acc, item) => {
            acc.push({
                id: item._id,
                title: item.title,
                color: item.color,
                order: item.order,
                created_at: item.created_at,
                updated_at: item.updated_at,
            });
            return acc;
        }, []);
    }
    statusObject(data) {
        return data.reduce((acc, item) => {
            acc.id = item._id;
            acc.title = item.title;
            acc.color = item.color;
            acc.order = item.order;
            acc.created_at = item.created_at;
            acc.updated_at = item.updated_at;
            return acc;
        }, {});
    }
}

module.exports = new StatusDTO();
