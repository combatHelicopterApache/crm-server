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



module.exports = (target, data, company) => {
    const filterOptions = []

    filterOptions.push({ company_id: new mongoose.Types.ObjectId(company) });

    if( target === 'leads') {
        if (data.status && Array.isArray(data.status)) {
            const statusIds = getObjectId('status_id', data.status);
            filterOptions.push(statusIds);
        }

        if (data.first_name && Array.isArray(data.first_name)) {
            const firstNameCondition = getString('first_name', data.first_name);
            filterOptions.push(firstNameCondition);
        }


    }
    return filterOptions
}