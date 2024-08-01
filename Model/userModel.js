const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    gender: { type: String, required: true } 
});

const UserModel = mongoose.model("registers", userSchema);
module.exports = UserModel;
