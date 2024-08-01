const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    aprice: { type: Number, required: true },
    pprice: { type: Number, required: true },
    savemoney: { type: String, required: true },
    features: { type: [String], required: true }  ,
    rating:{type:Number,required:true},
    brand:{type:String,required:true},
   email:{type:String,required:true}
});

module.exports = mongoose.model('wishlists', wishListSchema); 