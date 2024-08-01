const express = require("express");
const router = express.Router();
const ProductModel = require("../../Model/television");
const HomeModel = require("../../Model/homeApplience");

router.get("/television", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const priceSort = req.query.priceSort ? parseInt(req.query.priceSort) : null;
   
    const ratingSort = req.query.ratingSort ? parseInt(req.query.ratingSort) : null;
    const brandSort = req.query.brandSort ?(req.query.brandSort) : null;

    const sortOption = {};
    const filterOption = {};

    if (priceSort !== null) {
        sortOption.aprice = priceSort;
    }
    if (brandSort !== null) {
        filterOption.brand = brandSort;
    }
    if (ratingSort !== null) {
        filterOption.rating = ratingSort === 5 ? { $eq: 5 } : { $gte: ratingSort, $lt: 5 };
    }

    try {
        const totalItems = await ProductModel.countDocuments(filterOption);
        const data = await ProductModel.find(filterOption).sort(sortOption).limit(limit).skip(skip);
        if (data && data.length > 0) {
            res.status(200).json({ "msg": "Request successful", "data": data, "totalItems": totalItems });
        } else {
            res.status(404).json({ "msg": "No televisions found", "data": null });
        }
    } catch (err) {
        res.status(500).json({ "msg": "Server error", "error": err.message });
    }
});

router.get("/homeAppliance", async (req, res) => {
    try {
        const data = await HomeModel.find();
        if (data && data.length > 0) {
            res.status(200).json({ "msg": "Request successful", "data": data });
        } else {
            res.status(404).json({ "msg": "No home appliances found", "data": null });
        }
    } catch (err) {
        res.status(500).json({ "msg": "Server error", "error": err.message });
    }
});


router.get("/television/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const data=await ProductModel.findOne({_id:id})
        if(data){
            res.status(200).json({"msg":"resource found","data":data})
        }
        else{
            res.status(404).json({"msg":"responess not found","data":null})
        }
    }catch(err){
        res.status(500).json({"msg":"Internal Server Error"})
    }
})
module.exports = router;
