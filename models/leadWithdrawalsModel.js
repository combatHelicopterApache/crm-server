const {model, Schema} = require('mongoose')

const withdrawal = new Schema({
        product: {type: String, required: false},
        product_id: {type: String, required: false},
        assigned_to: {type: String, required: false, default: ''},
        dest_id: {type: String, required: false, default: ''},
        type: {type: String, required: false, default: ''},
        amount: {type: Number, required: false, default: 0},
        currency: {type: String, required: false},
        status: {type: String, required: false, default: ''}, // approved/not_approved/pending
        time_initiated: {type: Date, required: false},
        time_processed: {type: String, required: false},
        info: {type: String, required: false, default: ''},
        transaction_type: {type: String, required: false, default: 'fake'}, // real/fake
        actions: {type: String, required: false, default: ''}
    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

module.exports = model('Withdrawals', withdrawal)