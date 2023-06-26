const {model, Schema } = require('mongoose')

const deposit = new Schema({
        uid: {type: String, required: false},
        product: {type: String, required: false},
        product_id: {type: String, required: false},
        assigned_to: {type: String, required: false, default: ''},
        aff_data: {type: String, required: false, default: ''},
        aff_name: {type: String, required: false, default: ''},
        funnel_name: {type: String, required: false, default: ''},
        type: {type: String, required: false, default: ''},
        amount: {type: Number, required: false, default: 0},
        currency: {type: String, required: false},
        conversion: {type: String, required: false},

        amount_converted: {type: Number, required: false, default: 0},
        status: {type: String, required: false, default: ''}, // approved/not_approved/pending
        time_initiated: {type: Date, required: false},
        time_processed: {type: String, required: false},
        info: {type: String, required: false, default: ''},
        wallet: {type: String, required: false, default: ''},

        transaction_type: {type: String, required: false, default: 'fake'}, // real/fake
        source: {type: String, required: false},
        actions: {type: String, required: false, default: ''}
    }, {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        }
    }
)

module.exports = model('Deposits', deposit)