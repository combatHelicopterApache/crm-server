const {model, Schema } = require('mongoose')

const account = new Schema({
        product: {type: String, required: false},
        product_id: {type: String, required: false},
        group: {type: String, required: false, default: ''},
        currency: {type: String, required: false},
        enabled: {type: Boolean, required: false, default: false},
        leverage: {type: String, required: false, default: ''},
        amount: {type: Number, required: false, default: 0},
        margin: {type: Number, required: false, default: 0},
        margin_level: {type: String, required: false, default: 0},
        balance: {type: Number, required: false, default: 0},
        credit: {type: String, required: false},
        actions: {type: String, required: false, default: ''}
    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

module.exports = model('Accounts', account)