

class OfficeDTO {
    async officeArray (data) {
        return data.reduce((acc, item) => {
            acc.push({
                id: item._id,
                title: item.title,
                address: item.address,
                description: item.description,
                company_id: item.company_id,
            })
            return acc
        }, [])
    }
    async officeObject (data) {
        return Array(data).reduce((acc, item) => {
            acc.id = item._id,
            acc.title = item.title,
            acc.address = item.address,
            acc.description = item.description,
            acc.company_id = item.company_id
            return acc
        }, {})
    }
}

module.exports = new OfficeDTO()
