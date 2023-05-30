const { model, Schema } = require('mongoose')

const groups = new Schema({
    uid:              { type: String, required: true, unique: true },
    title_en:         { type: String, required: true, unique: true },
    code:             { type: String, required: true, unique: true },
    users_uid:        { type: Array, default: [] }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
})

module.exports = model('Groups', groups )