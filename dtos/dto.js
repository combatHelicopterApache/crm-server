module.exports = (data, hide) => {
    const result = {};

    for (const [key, value] of Object.entries(data[0])) {
        result[key] = value;
    }

    result.id = data._id;
    delete result._id;
    delete result.__v;
    delete result.password;

    return result;
}
