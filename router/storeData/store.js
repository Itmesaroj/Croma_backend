const express = require("express");
const router = express.Router();
const CartModel = require("../../Model/cartmodel");
const WishListModel = require("../../Model/wishListmodel");
const middleToken = require("../../Middleware/verify");
const OrderModel = require("../../Model/address"); 


router.post("/carts",middleToken, async (req, res) => {
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

router.post("/wishlist",middleToken, async (req, res) => {
  const productData = req.body;
  console.log("Adding to wishlist:", productData);
  try {
    const wishdata = new WishlistModel({
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
    await wishdata.save();
    const data = await WishListModel.find({ email: productData.email });
    res.status(201).json({ msg: "Product successfully added", totalProduct: data.length });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.get("/carts",middleToken, async (req, res) => {
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

router.get("/wishlist",middleToken, async (req, res) => {
  const email = req.body.email;
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

router.delete("/wishlist",middleToken, async (req, res) => {
  const productId = req.body.id;
  try {
    const deletedProduct = await WishListModel.findByIdAndDelete({ _id: productId });
    if (deletedProduct) {
      res.status(200).json({ msg: "Product successfully deleted" });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.delete("/carts", middleToken,async (req, res) => {
  const productId = req.body.id;
  try {
    const deletedProduct = await CartModel.findByIdAndDelete({ _id: productId });
    if (deletedProduct) {
      res.status(200).json({ msg: "Product successfully deleted" });
    } else {
      res.status(404).json({ msg: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});





router.post("/order", middleToken, async (req, res) => {
  const { firstName, lastName, email, phone, address, orderItems, addemail } = req.body;
  console.log(firstName, lastName, email, phone, address, orderItems, addemail);

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
