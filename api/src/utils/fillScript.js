const {
  Brand,
  Category,
  Product,
  Subcategory,
  User,
} = require("../db");
const fs = require("fs");
const axios = require("axios");
const bcrypt = require("bcrypt");

//Just to fill the db.

const bulkCreateCategories = async () => {
  try {
    let data = fs.readFileSync(__dirname + "/../json/categories.json", "utf8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Category.findOrCreate({
        where: {
          name: data[i].name,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateSubcategories = async () => {
  try {
    let data = fs.readFileSync(
      __dirname + "/../json/subcategories.json",
      "utf8"
    );
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Subcategory.findOrCreate({
        where: {
          name: data[i].name,
          CategoryId: data[i].category_id,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateBrands = async () => {
  try {
    let data = fs.readFileSync(__dirname + "/../json/brand.json", "utf8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Brand.findOrCreate({
        where: {
          name: data[i].name,
          logo_url: data[i].logo_url,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateProducts = async () => {
  try {
    let data = fs.readFileSync(__dirname + "/../json/products.json", "utf8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      await Product.findOrCreate({
        where: {
          name: data[i].name,
          image: data[i].image,
          price: parseFloat(data[i].price.trim().replace("US$ ", "")).toFixed(
            2
          ),
          description: data[i].description,

          weight: data[i].weight,

          stock: data[i].stock,

          BrandId: data[i].BrandId,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const bulkCreateUsers = async () => {
  try {
    let data = fs.readFileSync(__dirname + "/../json/users.json", "utf8");
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      data[i].password = await bcrypt.hash(data[i].password, 8);
      await User.findOrCreate({
        where: {
          name: data[i].name,
          surname: data[i].surname,
          password: data[i].password,
          email: data[i].email,
          role: data[i].role,
          isActive: data[i].isActive,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  bulkCreateBrands,
  bulkCreateProducts,
  bulkCreateUsers,
  bulkCreateSubcategories,
  bulkCreateCategories,
};
