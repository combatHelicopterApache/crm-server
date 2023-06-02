const { Schema, model} = require('mongoose')

const permissionsModel = new Schema({
	title: { type: String, unique: true, require: true },
	code : { type: String, unique: true, require: true },
	permissions: { type: Object },
})

module.exports = model('Permissions', permissionsModel)