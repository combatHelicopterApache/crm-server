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
        restrictions: item?.restrictions,
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
      });
      return acc;
    }, []);
  }
  async userObject(data) {
    const result = {};

    for (const [key, value] of Object.entries(data)) {
      result[key] = value;
    }

    result.id = data._id;
    delete result._id;
    delete result.__v;
    delete result.password;

    return result;
  }
}

module.exports = new UserDTO();
