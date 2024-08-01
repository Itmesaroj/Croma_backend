const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../../Model/userModel");
const BlackListModel=require("../../Model/blackList")

const dotenv=require('dotenv').config();
const JWT_SECRET=process.env.JWT_SECRET
router.post("/register", async (req, res) => {
    const userData = req.body;
    console.log(userData);

    // Input validation
    if (!userData.username || typeof userData.username !== 'string') {
        return res.status(400).json({ "msg": "Validation error", "error": "Username is required and should be a string." });
    }
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        return res.status(400).json({ "msg": "Validation error", "error": "Email is required and should be a valid email address." });
    }
    if (!userData.password || typeof userData.password !== 'string') {
        return res.status(400).json({ "msg": "Validation error", "error": "Password is required and should be a string." });
    }
    if (!userData.mobileNumber || typeof userData.mobileNumber !== 'number') {
        return res.status(400).json({ "msg": "Validation error", "error": "Mobile number is required and should be a number." });
    }
    if (!userData.gender || !['male', 'female', 'other'].includes(userData.gender)) {
        return res.status(400).json({ "msg": "Validation error", "error": "Gender is required and should be 'male', 'female', or 'other'." });
    }
   

    try {
        const exists = await UserModel.findOne({ email: userData.email });
        if (exists) {
            return res.status(400).json({ "msg": "Validation error", "error": "User already exists." });
        }
        bcrypt.hash(userData.password, 10, async (error, hash) => {
            if (error) {
                res.status(500).json({ "msg": "Internal server error", "error": error });
            } else {
                const data = new UserModel({
                    username: userData.username,
                    email: userData.email,
                    password: hash,
                    mobileNumber: userData.mobileNumber,
                    gender: userData.gender,
                  
                });
                await data.save();
                res.status(201).json({ "msg": "User Successfully Registered" });
            }
        });
    } catch (error) {
        res.status(500).json({ "msg": "Internal server error", "error": error.message });
    }
});

router.post("/login", async (req, res) => {
    const userData = req.body;
    if (!userData.email || !/\S+@\S+\.\S+/.test(userData.email)) {
        return res.status(400).json({ "msg": "Validation error", "error": "Email is required and should be a valid email address." });
    }
    if (!userData.password || typeof userData.password !== 'string') {
        return res.status(400).json({ "msg": "Validation error", "error": "Password is required and should be a string." });
    }
    try {
        const user = await UserModel.findOne({ email: userData.email });
        if (user) {
            bcrypt.compare(userData.password, user.password, async (error, result) => {
                if (error) {
                    res.status(500).json({ "msg": "Internal server error", "error": error });
                } else if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        username: user.username,
                        gender: user.gender,
                        mobileNumber: user.mobileNumber
                    }, JWT_SECRET);
                    res.status(200).json({ "msg": "Login successfully", "token": token });
                } else {
                    res.status(401).json({ "msg": "Invalid credentials" });
                }
            });
        } else {
            res.status(404).json({ "msg": "User not registered" });
        }
    } catch (err) {
        res.status(500).json({ "msg": "Internal server error", "error": err });
    }
});

router.post("/logout",async(req,res)=>{
    const data=req.headers.authorization
    const token=data.split(" ")[1]
    try{
        if (token) {
            const user = new BlackListModel({ token:token });
            await user.save();
            res.status(200).send("Logout successfully");
        }
        else{
            res.status(400).send("Token related error");
        }
    }catch(err){
        res.status(500).json({"msg":"server internal error","error":err})
    }
}
)
module.exports = router;
