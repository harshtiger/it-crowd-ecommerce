const express = require("express");
const {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/product.js");

//Creating routes and adding the controllers...

const productRouter = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/auth");

//guests and users
// these endpoints, as requested by the challenge, do not need an auth middleware
productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getSingleProduct);

//admin
productRouter.put("/admin/products/:id", isLoggedIn, isAdmin, updateProduct);
productRouter.post("/admin/products", isLoggedIn, isAdmin, createProduct);
productRouter.delete("/admin/products/del/:id", isLoggedIn, isAdmin, deleteProduct);


module.exports = productRouter;
