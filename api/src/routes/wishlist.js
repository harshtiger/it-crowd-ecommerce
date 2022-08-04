const express = require("express");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/wishlist.js");
const { isLoggedIn } = require("../middleware/auth");

//Creating routes and adding the controllers.

const wishlistRouter = express.Router();

// we require the user to be logged in for whishlists, since they are asociated with a user account

wishlistRouter.get("/wishlist", isLoggedIn, getWishlist);
wishlistRouter.post("/wishlist/:productId", isLoggedIn, addToWishlist);
wishlistRouter.delete("/wishlist/:productId", isLoggedIn, removeFromWishlist);

module.exports = wishlistRouter;
