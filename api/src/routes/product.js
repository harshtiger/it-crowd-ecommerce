const express = require("express");
const {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
  setInactiveProduct
} = require("../controllers/product.js");

//Creating routes and adding the controllers...

const productRouter = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/auth");


//guests and users
// these endpoints, as requested by the challenge, do not need an auth middleware
productRouter.get("/products", getProducts);
productRouter.get("/products/:id", getSingleProduct);

//admin
productRouter.put("/admin/products/inactive/:id", isLoggedIn, isAdmin, setInactiveProduct);
productRouter.put("/admin/products/:id", isLoggedIn, isAdmin, updateProduct);
productRouter.post("/admin/products", isLoggedIn, isAdmin,  createProduct);
productRouter.delete("/admin/products/del/:id", isLoggedIn, isAdmin, deleteProduct);
// NOTE despite the challenge asked for a delete method on products, deleting on relational databases may lead to some issues
// most of the time, when we delete a product that has a relation with another table, the foreign keys will refer to something
// that no longer exists there, therefore, setting the product to "inactive" is a much better option


module.exports = productRouter;
