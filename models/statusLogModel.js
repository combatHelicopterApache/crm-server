const {Schema, model, Types:{ObjectId}} = require('mongoose')

const statusLogs = new Schema({
    lead_id: {type: ObjectId, required: false},
    statuses: [
        {
            created_by: {type: ObjectId, ref: "Users", required: false},
            created_at: {type: Date, required: false},
            updated_at: {type: Date, required: false, default: null},
            description: {type: String, required: false, default: null},
            prev_status_id: {type: ObjectId, required: false, default: null},
            prev_status_title: {type: String, required: false, default: null},
            curr_status_id: {type: ObjectId, required: false},
            curr_status_title: {type: String, required: false},
        }
    ]
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})

module.exports = model('StatusLogs', statusLogs)