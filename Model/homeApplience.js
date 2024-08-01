const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    aprice: { type: Number, required: true },
    pprice: { type: Number, required: true },
    savemoney: { type: String, required: true },
    features: { type: [String], required: true }  ,
    rating:{type:Number,required:true},
    brand:{type:String,required:true}
});

const HomeModel = mongoose.model("homeapplieans", productSchema);
module.exports = HomeModel;
