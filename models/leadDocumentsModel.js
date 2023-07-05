const {model, Schema } = require('mongoose')

const document = new Schema({
        type: {type: String, required: false},
        time_processed: {type: String, required: false},
        status: {type: String, required: false, default: ''},
        info: {type: String, required: false},
        actions: {type: String, required: false, default: ''}
    }, {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

module.exports = model('Documents', document)