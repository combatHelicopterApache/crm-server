const { model, Schema } = require('mongoose')


const users = new Schema({
    full_name:        { type: String, required: true, unique: true  },
    login:            { type: String, required: true, unique: true },
    email:            { type: String, required: true, unique: true },
    password:         { type: String, required: true },
    role:             { type: String, required: true, default: 'new' },
    group:            { type: String, required: true, default: '' },
    is_admin:         { type: String, required: true, default: false },
    attached_users:   { type: Array,  default: [] }
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
})

module.exports = model('Users', users )