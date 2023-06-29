const {model, Schema} = require('mongoose')

const status = new Schema( {
        title:      { type: String, required: true },
        color:      { type: String, required: true, default: "#ffffff" },
        order:      { type: Number, required: false },
    },  {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
)

module.exports = model('Statuses', status)