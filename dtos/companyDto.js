

class CompanyDTO {
    companyArray (data) {
        return data.reduce((acc, item, idx) => {
            acc.push({
                id: item._id,
                company_name: item.company_name,
                company_email: item.company_email,
                company_phone: item.company_phone,
                admin_name: item.admin_name,
                admin_phone: item.admin_phone,
                admin_email: item.admin_email,
                company_identifier: item.company_identifier,
                address: item.address,
                title: item.title,
                notes: item.notes,
                status: item.status,
                owner_id: item.owner_id,
                owner: item.owner,
                brands: item.brands,
                key: idx
            })
            return acc
        }, [])
    }

    companyObject (data) {
        return Array(data).reduce((acc, item, idx) => {
            acc.id = item._id
            acc.company_name = item.company_name
            acc.company_email = item.company_email
            acc.company_phone = item.company_phone
            acc.admin_name = item.admin_name
            acc.admin_phone = item.admin_phone
            acc.admin_email = item.admin_email
            acc.company_identifier = item.company_identifier
            acc.address = item.address
            acc.title = item.title
            acc.notes = item.notes
            acc.status = item.status
            acc.owner_id = item.owner_id
            acc.owner = item.owner
            acc.brands = item.brands
            acc.key = idx
            return acc
        }, {})
    }
}

module.exports = new CompanyDTO()
