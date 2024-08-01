const mongoose=require("mongoose");

const blackListSchem=mongoose.Schema({
    token:{type:String,required:true}
})
const BlackListModel=mongoose.model("blacklists",blackListSchem);
module.exports=BlackListModel;