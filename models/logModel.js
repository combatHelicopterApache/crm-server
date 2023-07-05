const {model,
    Schema,
    Types: { ObjectId }
} = require('mongoose')

const log = new Schema({
        user_id: {type: ObjectId, required: true},
        user_name: {type: String, required: false},
        action: {type: String, required: true, default: ''},
        level: {type: String, required: false},
        relation: {type: String, required: false, default: ''},
        relation_id: {type: String, required: false, default: ''},
        message: {type: String, required: false, default: ''},
        created_by: {type: ObjectId, ref:'Users', required: false, default: ''},
        updated_by: {type: ObjectId, ref:'Users', required: false, default: ''},
        metadata: {
            ip: {type: String, required: false, default: '0.0.0.0'},
            domain: {type: String, required: false, default: ''},
            app_version: {type: String, required: false, default: ''},
        },
    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

module.exports = model('Logs', log)