const {model, Schema, Types: { ObjectId }} = require('mongoose')

const lead = new Schema( {
    uid:            { type: String, required: true },
    first_name:     { type: String, required: true },
    last_name:      { type: String, required: true },
    phone:          { type: String, required: true, unique: true },
    email:          { type: String, required: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/ },
    affiliate:      { type: String, required: true },
    source:         { type: String, required: true, lowercase: true },
    manager_id:     { type: ObjectId, required: true, default: '' },
    status:         { type: String, required: true, default: 'NEW' },
    balance:        { type: Number, default: 0 },
    brand_id:       { type: ObjectId, required: true, default: 'N/A' },
    ip:             { type: Number, required: true, default: '0.0.0.0'  },
    call:           {
        call_count: { type: Number, required: true, default: 0 },
        call_start: { type: String, required: true, default: '' },
        call_end:   { type: String, required: true, default: '' },
    },
    geo:            { type: String, required: false, default: '' },
    comment:        { type: String, required: false, default: '' },
    comment:        { type: String, required: false, default: '' },
},  {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
)

module.exports = model('Leads', lead)