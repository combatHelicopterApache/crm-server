const {model, Schema, Types: {ObjectId}} = require('mongoose')

const lead = new Schema({
        uid: {type: String, required: true, unique: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        phone: {type: String, required: true, unique: false},
        email: {type: String, required: true, unique: false},
        affiliate: {type: String, required: false},
        password: {type: String, required: false, default: '123456Ads!'},
        source: {type: String, required: false, lowercase: true},
        ip: {type: String, required: false, default: '0.0.0.0'},
        geo: {type: String, required: false, default: 'N/A'},
        funnel_name: {type: String, required: false, default: ''},
        client_type: {type: String, required: false, default: 'sales'}, // sales/retention

        assigned_to: {type: ObjectId, ref: 'Users', required: false, default: null},
        created_by: {type: ObjectId, ref: 'Users', required: false, default: null},
        company_id: {type: ObjectId, ref: 'Companies', required: true },
        manager_id: {type: ObjectId, ref: 'Users', required: false, default: null},
        status_id: {type: ObjectId, ref: 'Statuses', required: false, default: null},
        brand_id: {type: ObjectId, ref: 'Brands', required: false, default: null},
        calls: {type: ObjectId, ref: 'Calls', required: false},
        comment_id: {type: ObjectId, ref: 'Comments', required: false, default: null},
        logs: {type: ObjectId, ref: 'Logs', required: false, default: null},
        payments:  {
            deposits: {type: ObjectId, ref: 'Deposits', required: false, default: null},
            withdrawals: {type: ObjectId, ref: 'Withdrawals', required: false, default: null},
            accounts: {type: ObjectId, ref: 'Accounts', required: false, default: null},
            cfd_orders: {type: ObjectId, ref: 'Orders', required: false, default: null},
            documents: {type: ObjectId, ref: 'Documents', required: false, default: null},
        }
    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)
lead.index({ uid: 1 });
lead.index({ company_id: 1 });
lead.index({ manager_id: 1 });
lead.index({ status_id: 1 });
lead.index({ brand_id: 1 });
lead.index({ comment_id: 1 });
lead.index({ assigned_to: 1 });
lead.index({ email: 1 });
lead.index({ phone: 1 });
lead.index({ created_at: -1 });
lead.index({ updated_at: -1 });


module.exports = model('Leads', lead)