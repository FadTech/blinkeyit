import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    
    OrderId:{
        type: String,
        required: [true, "OrderId is required"],
        unique: true,
    },

    productId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
    },

    product_details: {
       name : string,
       image : array,
    },

    paymentid: {
        type: String,
        default: "",
    },

    payment_status: {
        type: String,
        default: "",
    },

    delivery_address: {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
    },

    subTotalAmt: {
        type: Number,
        default: 0,
    },

    totalAmt: {
        type: Number,
        default: 0,
    },

    invoice_receipt : {
        type: String,
        default: "",
    },

}, {
    timestamps: true
})

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;