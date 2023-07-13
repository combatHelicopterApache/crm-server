const mongoose = require("mongoose");

// search elements from Array Strings
const getString = (field, values) => {
    const regexArray = values.map((value) => new RegExp(value, 'i'));
    return { [field]: { $in: regexArray } };
}
// search elements from Array ObjectIds
const getObjectId = (field, values) => {
    const regexArray = values.map((value) => new mongoose.Types.ObjectId(value))
    return { [field]: { $in: regexArray } };
}
// search elements from-to Array Date
const getByDate = (field, values) => {
    const regexArray = values.map((value) => new mongoose.Types.ObjectId(value))
    return { [field]: { $in: regexArray } };
}


module.exports = (target, data, company) => {
    const filterOptions = []

    filterOptions.push({ company_id: new mongoose.Types.ObjectId(company) });

    if( target === 'leads') {
        if (data.status && Array.isArray(data.status)) {
            const ids = getObjectId('status_id', data.status);
            filterOptions.push(ids);
        }
        if (data.manager_id && Array.isArray(data.manager_id)) {
            const ids = getObjectId('manager_id', data.manager_id);
            filterOptions.push(ids);
        }

        if (data.first_name && Array.isArray(data.first_name)) {
            const condition = getString('first_name', data.first_name);
            filterOptions.push(condition);
        }

        if (data.last_name && Array.isArray(data.last_name)) {
            const condition = getString('last_name', data.last_name);
            filterOptions.push(condition);
        }

        if (data.email && Array.isArray(data.email)) {
            const condition = getString('email', data.email);
            filterOptions.push(condition);
        }

        if (data.affiliate && Array.isArray(data.affiliate)) {
            const condition = getString('affiliate', data.affiliate);
            filterOptions.push(condition);
        }

        if (data.source && Array.isArray(data.source)) {
            const condition = getString('source', data.source);
            filterOptions.push(condition);
        }

        if (data.geo && Array.isArray(data.geo)) {
            const condition = getString('geo', data.geo);
            filterOptions.push(condition);
        }

        if (data.client_type && Array.isArray(data.client_type)) {
            const condition = getString('client_type', data.client_type);
            filterOptions.push(condition);
        }

        if (data.assigned_to && Array.isArray(data.assigned_to)) {
            const condition = getObjectId('assigned_to', data.assigned_to);
            filterOptions.push(condition);
        }

        if (data.created_at && Array.isArray(data.created_at)) {
            console.log(data.created_at[0])
            const condition = getByDate('created_at', data.created_at);
            filterOptions.push(condition);
        }
    }
    return filterOptions
}