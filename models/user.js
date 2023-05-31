const { model, Schema } = require('mongoose')


const user = new Schema({
    full_name:        { type: String,  required: true },
    login:            { type: String,  required: true, unique: true },
    email:            { type: String,  required: true, unique: true },
    password:         { type: String,  required: true },
    role:             { type: String,  required: true },
    group:            { type: String,  required: true },
    is_admin:         { type: Boolean, required: true, default: false },
    attached_users:   { type: Array,   default: [] }
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
})

module.exports = model('Users', user )