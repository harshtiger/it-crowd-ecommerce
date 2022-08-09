const express = require("express");
const { getBrands, createBrand, deleteBrand } = require("../controllers/brand.js");
const {isLoggedIn, isAdmin} = require("../middleware/auth")


const brandRouter = express.Router();

brandRouter.get("/brands", getBrands);

brandRouter.post("/brands", isLoggedIn, isAdmin, createBrand);

brandRouter.delete("/brands/:id",isLoggedIn, isAdmin, deleteBrand);


module.exports = brandRouter;
