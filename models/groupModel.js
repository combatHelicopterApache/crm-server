const { model, Schema } = require('mongoose')

const groupModel = new Schema({
    uid:              { type: String, required: true, unique: true },
    title_en:         { type: String, required: true, unique: true },
    code:             { type: String, required: true, unique: true },
    users_uid:        { type: Array, default: [] }
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
})

module.exports = model('Groups', groupModel )