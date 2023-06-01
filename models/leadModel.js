const {model, Schema} = require('mongoose')

const lead = new Schema( {
    uid:            { type: String, required: true },
    first_name:     { type: String, required: true },
    last_name:      { type: String, required: true },
    phone:          { type: String, required: true, unique: true },
    email:          { type: String, required: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
    affiliate:      { type: String, required: true },
    source:         { type: String, required: true, lowercase: true},
    manager:        { type: String, required: true, default: '' },
    status:         { type: String, required: true, default: 'NEW' },
    balance:        { type: Number, default: 0 },
    comment:        { type: String },
},  {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
)

module.exports = model('leads', lead)