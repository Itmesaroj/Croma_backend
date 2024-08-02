const express=require("express");
const router=express.Router();
const CartModel=require("../../Model/cartmodel");
const WishListModel=require("../../Model/wishListmodel");
const middleToken = require("../../Middleware/verify");
const OrderModel = require("../../Model/address");


router.use(middleToken);


router.post("/carts", async (req, res) => {
  const productData = req.body;
  try {
    const cartdata = new CartModel({
      email: productData.email,
      image: productData.image,
      title: productData.title,
      aprice: productData.aprice,
      pprice: productData.pprice,
      savemoney: productData.savemoney,
      features: productData.features,
      rating: productData.rating,
      brand: productData.brand,
    });
    await cartdata.save();
    const data = await CartModel.find({ email: productData.email });
    res.status(201).json({ msg: "Product successfully added", totalProduct: data.length });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


router.post("/wishlist", async (req, res) => {
  const { email, image, title, aprice, pprice, savemoney, features, rating, brand } = req.body;
  try {
    const wishdata = new WishListModel({
      email,
      image,
      title,
      aprice,
      pprice,
      savemoney,
      features,
      rating,
      brand,
    });

    await wishdata.save();
    const data = await WishListModel.find({ email: email });
    res.status(201).json({ msg: "Product successfully added", totalProduct: data.length });
  } catch (err) {
    console.error("Error adding to wishlist:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


router.get("/carts", async (req, res) => {
  const email = req.body.email; 
  try {
    const data = await CartModel.find({ email: email });
    if (data && data.length > 0) {
      res.status(200).json({ msg: "Request successful", data: data });
    } else {
      res.status(404).json({ msg: "No products in cart", data: null });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


router.get("/wishlist", async (req, res) => {
  const email = req.body.email; 
  console.log(email)
  try {
    const data = await WishListModel.find({ email: email });
    if (data && data.length > 0) {
      res.status(200).json({ msg: "Request successful", data: data });
    } else {
      res.status(404).json({ msg: "No products in wishlist", data: null });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


router.delete("/wishlist", async (req, res) => {
  const productId = req.body.id;
  try {
    const deletedProduct = await WishListModel.findByIdAndDelete(productId);
    if (deletedProduct) {
      res.status(200).json({ msg: "Product successfully deleted" });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


router.delete("/carts", async (req, res) => {
  const productId = req.body.id;
  try {
    const deletedProduct = await CartModel.findByIdAndDelete(productId); // Use productId directly
    if (deletedProduct) {
      res.status(200).json({ msg: "Product successfully deleted" });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


router.post("/order", async (req, res) => {
  const { firstName, lastName, email, phone, address, orderItems, addemail } = req.body;
  try {
    for (const item of orderItems) {
      const orderData = new OrderModel({
        firstName,
        lastName,
        email,
        phone,
        address,
        image: item.image,
        title: item.title,
        aprice: item.aprice,
        pprice: item.pprice,
        savemoney: item.savemoney,
        features: item.features,
        rating: item.rating,
        brand: item.brand,
        addemail
      });

      await orderData.save();
    }

    res.status(201).json({ msg: "Order successfully added", data: null });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
