const {model, Schema, Types: {ObjectId}} = require('mongoose')


const status = new Schema( {
        title:      { type: String, required: true, default: 'NEW'},
        color:      { type: String, required: true, default: process.env.DEFAULT_STATUS_COLOR},
        order:      { type: Number, required: false, default: 1 },
        status_default: { type: Boolean, required: false },
        created_by_id:    { type: ObjectId, ref:"Users", default: null},
        updated_by_id:    { type: ObjectId, ref:"Users", default: null},
        company_id: { type: ObjectId, default: '' }
    },  {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

module.exports = model('Statuses', status)