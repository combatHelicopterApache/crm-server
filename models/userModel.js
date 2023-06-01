const { model, Schema } = require('mongoose')


const userModel = new Schema({
    full_name:          { type: String,  required: true },
    title:              { type: String,  required: true },
    phone:              { type: String },
    email:              { type: String,  required: true, unique: true },
    password:           { type: String,  required: true },
    role:               { type: String,  required: true },
    role_id:            { type: Number,  required: true },
    group:              { type: String,  default: '' },
    is_admin:           { type: Boolean, required: true, default: false },
    parent_id:          { type: Number,  default: '' },
    child_id:           { type: Number,  default: '' },
    company_id:         { type: Number,  default: '' },
    permissions:        { type: Object }
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
})

module.exports = model('Users', userModel )