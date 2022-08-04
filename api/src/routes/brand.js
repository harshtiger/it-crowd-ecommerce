const express = require("express");
const { getBrands, createBrand } = require("../controllers/brand.js");



const brandRouter = express.Router();

brandRouter.get("/brands", getBrands);

brandRouter.post("/brands", createBrand);

module.exports = brandRouter;
