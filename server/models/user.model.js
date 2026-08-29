import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Provide password"]
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dxjv0gq4f/image/upload/v1690912345/avatars/default-avatar.png"
    },
    mobile: {
        type: Number,
        default: 0
    },

    refresh_token: {
        type: String,
        default: ""
    },

    verify_email: {
        type: Boolean,
        default: false
    },

    last_login_date: {
        type: Date,
        default: null
    },

    status: {
        type: String,
        enum: ["active", "inactive", "Suspended"],
        default: "active"
    },

    address_details: {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
    },

    Shopping_cart: {
        type: mongoose.Schema.ObjectId,
        ref: "cartProduct",
    },

    order_history: {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
    },

    forgot_password_otp: {
        type: String,
        default: null
    },

    forgot_password_expiry: {
        type: Date,
        default: null
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },


}, 

{ 
    
    timestamps: true

});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;