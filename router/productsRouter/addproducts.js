const express = require("express");
const router = express.Router();
const ProductModel = require("../../Model/television");
const HomeModel=require("../../Model/homeApplience")
router.post("/television", async (req, res) => {
    const productData = req.body; 

    try {
        const product = new ProductModel({
            image: productData.image,
            title: productData.title,
            aprice: productData.aprice,
            pprice: productData.pprice,
            savemoney: productData.savemoney,
            features: productData.features,
            rating:productData.rating,
            brand:productData.brand
        });

        await product.save(); 
        res.status(201).json({ msg: "Product successfully added", product });
    } catch (err) {
        res.status(500).json({ msg: "Internal server error", error: err.message }); 
    }
});


router.post("/homeApplience", async (req, res) => {
    const productData = req.body; 

    try {
        const product = new HomeModel({
            image: productData.image,
            title: productData.title,
            aprice: productData.aprice,
            pprice: productData.pprice,
            savemoney: productData.savemoney,
            features: productData.features,
            rating:productData.rating,
            brand:productData.brand
        });

        await product.save(); 
        res.status(201).json({ msg: "Product successfully added", product });
    } catch (err) {
        res.status(500).json({ msg: "Internal server error", error: err.message }); 
    }
})
module.exports = router;
