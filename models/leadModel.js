const {model, Schema, Types: {ObjectId}} = require('mongoose')

const lead = new Schema({
        uid: {type: String, required: true, unique: false},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        phone: {type: String, required: true, unique: false},
        email: {type: String, required: true, unique: false, match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/},
        affiliate: {type: String, required: false},
        password: {type: String, required: false, default: '123456Ads!'},
        source: {type: String, required: false, lowercase: true},
        ip: {type: String, required: false, default: '0.0.0.0'},
        geo: {type: String, required: false, default: 'N/A'},
        funnel_name: {type: String, required: false, default: ''},

        manager_id: {type: ObjectId, required: false, default: ''},
        manager_name: {type: String, required: false, default: ''},
        status_id: {type: ObjectId, required: true, default: ''},
        brand_id: {type: ObjectId, required: false, default: ''},
        brand_name: {type: String, required: false, default: ''},

        client_type: {type: String, required: false, default: 'sales'}, // sales/retention
        calls: {type: ObjectId, ref: 'Calls', required: false},
        comments: {type: ObjectId, ref: 'Comments', required: false, default: ''},
        logs: {type: ObjectId, ref: 'Logs', required: false, default: ''},
        payments:  {
            deposits: {type: ObjectId, ref: 'Deposits', required: false, default: ''},
            withdrawals: {type: ObjectId, ref: 'Withdrawals', required: false, default: ''},
            accounts: {type: ObjectId, ref: 'Accounts', required: false, default: ''},
            cfd_orders: {type: ObjectId, ref: 'Orders', required: false, default: ''},
            documents: {type: ObjectId, ref: 'Documents', required: false, default: ''},
        }
    }, {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
)

module.exports = model('Leads', lead)