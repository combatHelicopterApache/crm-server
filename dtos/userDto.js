class UserDTO {
    async userArray(data) {
        return data.reduce((acc, item) => {
            acc.push({
                id: item?._id,
                full_name: item?.full_name,
                title: item?.title,
                phone: item?.phone,
                email: item?.email,
                is_admin: item?.is_admin,
                active: item?.active,
                role_id: item?.role_id,
                role_name: item?.role_name,
                company_id: item?.company_id,
                company_name: item?.company_name,
                notes: item?.notes,
                user_identifier: item?.user_identifier,
                permissions: item?.permissions,
                last_login: item?.last_login,
                brands: item?.brands,
                desk_id: item?.desk_id,
                desk_name: item?.desk_name,
                manager_id: item?.manager_id,
                manager_name: item?.manager_name,
                owner_id: item?.owner_id,
                owner_name: item?.owner_name,
                pivot: item?.pivot,
                created_at: item?.created_at,
                updated_at: item?.updated_at,
            })
            return acc
        }, [])
    }
    async userObject(data) {
        return Array(data).reduce((acc, item) => {
                acc.id = item?._id,
                acc.full_name = item?.full_name,
                acc.title = item?.title,
                acc.phone = item?.phone,
                acc.email = item?.email,
                acc.is_admin = item?.is_admin,
                acc.active = item?.active,
                acc.role_id = item?.role_id,
                acc.role_name = item?.role_name,
                acc.company_id = item?.company_id,
                acc.company_name = item?.company_name,
                acc.notes = item?.notes,
                acc.user_identifier = item?.user_identifier,
                acc.permissions = item?.permissions,
                acc.last_login = item?.last_login,
                acc.brands = item?.brands,
                acc.desk_id = item?.desk_id,
                acc.desk_name = item?.desk_name,
                acc.manager_id = item?.manager_id,
                acc.manager_name = item?.manager_name,
                acc.mowner_id = item?.mowner_id,
                acc.owner_name = item?.owner_name,
                acc.pivot = item?.pivot,
                acc.created_at = item?.created_at,
                acc.updated_at = item?.updated_at
            return acc
        }, {})
    }
}

module.exports = new UserDTO()