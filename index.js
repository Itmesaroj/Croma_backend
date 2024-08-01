const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./router/userRouter/Auth");
const addProduct=require("./router/productsRouter/addproducts")
const server = express();
const productsRouter=require("./router/productsRouter/products");
const storeData=require("./router/storeData/store")
const cors = require('cors');
const dotenv=require('dotenv').config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
server.use(cors())
server.use(express.json());
server.use("/add",addProduct)
server.use("/api",storeData)
mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.error(err);
});
server.use("/fetchData",productsRouter)

server.use("/auth", authRouter);

server.get("/", (req, res) => {
    res.status(200).send("This is my class");
});

server.listen( PORT , () => {
    console.log("Server is listening on port 3000");
});
