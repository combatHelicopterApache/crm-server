const { model, Schema } = require('mongoose')

const userModel = new Schema({
    full_name:          { type: String,  required: true },
    title:              { type: String,  required: true },
    phone:              { type: String },
    email:              { type: String,  required: true, unique: true },
    password:           { type: String,  required: true },
    is_admin:           { type: Boolean, required: true, default: false },
    role_id:            { type: Number,  required: true },
    role_name:          { type: String,  required: true },
    company_id:         { type: Number,  default: '' },
    company_name:       { type: String,  default: '' },
    brand_id:           { type: Number,  default: '' },
    brand_name:         { type: String,  default: '' },
    desk_id:            { type: Number,  default: '' },
    desk_name:          { type: String,  default: '' },
    manager_id:         { type: Number,  default: '' },
    manager_name:       { type: String,  default: '' },
},{
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
})

module.exports = model('Users', userModel )