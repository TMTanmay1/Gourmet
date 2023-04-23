const cart = require("../models/cart");
const Cart = require("../models/cart");
const FoodItems = require("../models/food_items");
const Profile = require("../models/profile");
const express = require("express");

const router = express.Router();

//if a user clicks on add to cart button on a food item make a cart for that user
router.post("/cart", async (req, res) => {
    try{
        const { profile_id, foodItemID, quantity } = req.body;
        const cart = addToCart(profile_id, foodItemID, quantity);
        res.status(200).send(cart);
    }catch(e){
        res.status(500).send(e);
    }
});

//fetch the latest completed cart for a user
//will give the latest cart for a user
router.get("/cart/get", async (req, res) => {
    try{
        const { profile_id } = req.body;
        const cart = getCart(profile_id);
        res.status(200).send(cart);
    }
    catch(e){
        console.log(e);
        throw new Error("Unable to get cart");
    }
});

//Checkout the cart
router.post("/cart/checkout", async (req, res) => {
    try{
        const { profile_id, paymentMethod, discount, notes } = req.body;
        const cart = await Cart.findOne({ profile_id, status: "pending" });
        if(!cart){
            throw new Error("No cart found");
        }
        cart.status = "completed";
        cart.paymentMethod = paymentMethod;
        cart.discount = discount;
        cart.notes = notes;
        cart.final_price = cart.food_items.reduce((acc, item) => acc + item.food_item.price * item.quantity, 0);
        //according to copilot ye final price bana dega <3 
        await cart.save();
        res.status(200).send(cart);
    }catch(e){
        console.log(e);
        throw new Error("Unable to checkout");
    }
}); 