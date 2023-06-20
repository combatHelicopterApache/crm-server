const {model, Schema, Types: { ObjectId }} = require("mongoose");

const userModel = new Schema(
    {
        full_name: {type: String, required: true},
        title: {type: String, required: false, default: ""},
        phone: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        is_admin: {type: Boolean, required: true, default: false},
        active: {type: Boolean, default: true},
        role_id: {type: Number, required: true, default: 6},
        role_name: {type: String, required: true, default: "AGENT"},
        company_id: {type: ObjectId, required: true, default: new ObjectId},
        company_name: {type: String, required: true, default:"Admin"},
        background_color: {type: String, required: false, default: "#626ed4"},
        notes: {type: String, default: "", required: false},
        user_identifier: {type: String, default: "AM", required: false},
        permissions: {type: Object, required: true},
        last_login: {type: Date, default: null},
        brands: [
            {
                brand_id: {type: ObjectId, default: ""},
                brand_name: {type: String, default: ""},
            },
        ],
        desk_id: {type: ObjectId, default: null},
        desk_name: {type: String, default: null},
        manager_id: {type: ObjectId, default: null},
        manager_name: {type: String, default: null},
        owner_id: {type: ObjectId, default: null},
        owner_name: {type: String, default: null},
        pivot: {
            company_id: {type: Number, default: ""},
            manager_id: {type: Number, default: ""},
            desk_id: {type: Number, default: ""},
            brands: [
                {
                    brand_id: {type: ObjectId, default: ""},
                    brand_name: {type: String, default: ""},
                },
            ],
        },
        time_cards: {
            type: Object,
            required: false,
            default: {time_start: "10:00", time_end: "19:00"},
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
);

module.exports = model("Users", userModel);
