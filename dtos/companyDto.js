class CompanyDTO {
    companyArray(data) {
        return data.reduce((acc, item, idx) => {
            acc.push({
                id: item._id,
                company_name: item?.company_name,
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
                key: idx,
            });
            return acc;
        }, []);
    }

    companyObject(data) {
        return {
            id: data?._id,
            company_name: data.company_name,
            company_email: data.company_email,
            company_phone: data.company_phone,
            admin_name: data.admin_name,
            admin_phone: data.admin_phone,
            admin_email: data.admin_email,
            company_identifier: data.company_identifier,
            address: data.address,
            title: data.title,
            notes: data.notes,
            status: data.status,
            owner_id: data.owner_id,
            owner: data.owner,
            brands: data.brands
        }

    }
}
    module.exports = new CompanyDTO();
