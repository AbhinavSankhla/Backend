const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default: Date.now
    },
    updated_at:{
        type:Object
    }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;