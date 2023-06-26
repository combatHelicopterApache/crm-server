const {model,
    Schema,
    Types: { ObjectId }
} = require('mongoose')

const comment = new Schema({
        user_id: {type: ObjectId, required: true},
        user_name: {type: String, required: false},
        lead_id: {type: ObjectId, required: true, default: ''},
        description: {type: String, required: false},
        attached_files: {type: ObjectId, required: false, default: ''}
    }, {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
)

module.exports = model('Comments', comment)