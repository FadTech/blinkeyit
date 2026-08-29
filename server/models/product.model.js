import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },

    image: {
        type: Array,
        default: []
    },

    category:[ 
        {
        type: String,
        ref: "Category",
        },
    ],

    subcategory: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        },
    ],

    unit: {
        type: String,
        default: ""
    },

    stock: {
        type: Number,
        default: 0
    },

    price: {
        type: Number,
        default: 0
    },

    discount: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        default: ""
    },

    more_details: {
        type: object,
        default: {}
    },

    publish : {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
