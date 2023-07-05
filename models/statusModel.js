const {model, Schema} = require('mongoose')


const status = new Schema( {
        title:      { type: String, required: true },
        color:      { type: String, required: true, default: process.env.DEFAULT_STATUS_COLOR},
        order:      { type: Number, required: false },
    },  {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

module.exports = model('Statuses', status)