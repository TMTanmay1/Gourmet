const FoodItems = require("../models/food_items");
const Profile = require("../models/profile");
const Wishlist = require('../models/wishlist')
const  mongoose = require('mongoose')
const express = require("express");

const router = new express.Router();

router.get("/wishlist/get", async(req,res)=>{
    try{
        const { user } = req.body;
        const wishlist = await Wishlist.find({user: user})
        res.status(200).send(wishlist);
    }
    catch(e){
        console.log(e);
        throw new Error("Unable to get wishlist");
    }
}
)

router.post("/wishlist/add", async(req,res)=>{
    try{
        const { user, dish,} = req.body;
        console.log(user, dish);

        const items = await Wishlist.findOne()
        console.log(items);
       
        var wishlist = new Wishlist({
            user: user,
            dish: dish
        })
        await wishlist.save();
        res.status(200).send(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
})

router.delete('/wishlist/delete', async(req,res)=>{
    try {
        const wishlistItemId = req.body;
        console.log(wishlistItemId);
        const wishlist = await Wishlist.findOne(wishlistItemId);

        console.log(wishlist);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
})

module.exports = router;