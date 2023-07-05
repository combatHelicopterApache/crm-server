const {model, Schema, Types: {ObjectId}} = require('mongoose')


const status = new Schema( {
        title:      { type: String, required: true },
        color:      { type: String, required: true, default: process.env.DEFAULT_STATUS_COLOR},
        order:      { type: Number, required: false },
        defaultStatus:    { type: Boolean, default: false},
        created_by_id:    { type: ObjectId, ref:"Users", default: null},
        updated_by_id:    { type: ObjectId, ref:"Users", default: null},
        company_id: { type: ObjectId, ref: "Companies", default: '' }

    },  {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

module.exports = model('Statuses', status)