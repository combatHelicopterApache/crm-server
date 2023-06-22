const {model, Schema} = require('mongoose')

const lead = new Schema( {
        title:     { type: String, required: true },
        color:     { type: String, required: true }
    },  {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
)

module.exports = model('Leads', lead)