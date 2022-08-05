const {
  Brand,

  Product,

  User,
} = require("../db");
const fs = require("fs");
const axios = require("axios");
const bcrypt = require("bcrypt");

//Just to fill the db.

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
};
