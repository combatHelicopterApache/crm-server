const {model, Schema, Types: {ObjectId}} = require('mongoose')

const lead = new Schema({
        lead_uid: {type: String, required: true},
        lead_first_name: {type: String, required: true},
        lead_last_name: {type: String, required: true},
        lead_phone: {type: String, required: true, unique: true},
        lead_email: {type: String, required: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/},
        lead_affiliate: {type: String, required: true},
        lead_source: {type: String, required: true, lowercase: true},
        lead_manager_id: {type: ObjectId, required: true, default: ''},
        lead_status_id: {type: ObjectId, required: true, default: ''},
        lead_status: {type: String, required: true, default: 'NEW'},
        lead_balance: {type: Number, default: 0},
        lead_brand_id: {type: ObjectId, required: true, default: 'N/A'},
        lead_ip: {type: Number, required: true, default: '0.0.0.0'},
        lead_call_id: {type: ObjectId, ref: 'Calls', required: false,  default: () => new ObjectId()},
        lead_geo: {type: String, required: false, default: ''},
        lead_type: {type: String, required: false, default: 'Sales'}, // sales/retention
        lead_comment: {type: String, required: false, default: ''},
    }, {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
)

module.exports = model('Leads', lead)