const {
    model,
    Schema,
    Types: {ObjectId}
} = require('mongoose')

const comment = new Schema({
        path: {type: String, required: false},
        elem_id: {type: ObjectId, required: false},
        comments: [
            {
                user_id: {type: ObjectId, ref: "Users", required: true},
                user_name: {type: String, required: false},
                description: {type: String, required: false, default: ''},

                deleted_by: {type: ObjectId, ref: "Users", required: false},
                deleted_by_name: {type: String, ref: "Users", required: false},
                deleted_at: {type: Date, default: ''},

                updated_by: {type: ObjectId, ref: "Users", required: false},
                updated_by_name: {type: String, ref: "Users", required: false},
                updated_at: {type: Date, default: ''},

                created_at: {type: Date, default: Date.now()},

                attached_files: {type: ObjectId, ref: "Uploads", required: false}
            }
        ]
    }, {
        timestamps: {
            created_at: "createdAt",
            updated_at: "updatedAt",
        }
    }
)

module.exports = model('Comments', comment)