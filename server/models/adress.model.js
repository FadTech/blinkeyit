import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    adress_line: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },

    pincode: {
        type: String,
        default: ""
    },


    country: {
        type: String,
        default: ""
    },

    mobile: {
        type: String,
        default: null
    },

    status: {
        type: boolean,
        default: null
    },
},{
    timestamps: true,
})

const AddressModel = mongoose.model("Address", addressSchema);

export default AddressModel;