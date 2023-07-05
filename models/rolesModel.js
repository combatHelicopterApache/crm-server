const { Schema, model} = require('mongoose')

const permissionsModel = new Schema({
	title: { type: String, unique: true, require: true },
	code : { type: String, unique: true, require: true },
	permissions: { type: Object },
},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
	)

module.exports = model('Permissions', permissionsModel)