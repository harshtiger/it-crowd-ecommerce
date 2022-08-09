const { Brand, Product } = require("../db");

const getBrands = async (req, res, next) => {
  try {
    let dataBrand = await Brand.findAll({});
    if (!dataBrand.length) {
      res.status(404).send({ errorMsg: "Brand not found" });
    }
    dataBrand = dataBrand.map((brand) => {
      return {
        name: brand.name,
        id: brand.id,
      };
    });
    res
      .status(200)
      .send({ successMsg: "Here are your brands.", data: dataBrand });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const createBrand = async (req, res, next) => {
  try {
    let { name, logo_url } = req.body;
    if (!name) {
      res.status(400).send({ errorMsg: "Missing data" });
    } else {
      const [newBrand, created] = await Brand.findOrCreate({
        where: {
          name,
          logo_url,
        },
      });
      created
        ? res
            .status(201)
            .send({ successMsg: "Brand successfully created.", data: newBrand })
        : res.status(400).send({ errorMsg: "Brand already exists." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const deleteBrand = async (req, res) => {
  const id = req.params.id;
  try {
    let dataProduct = await Product.findAll({
      where: {
        BrandId: id,
      },
    });
    if (dataProduct.length <=0) {                             // we do this so if there are products with that brand, it can not be deleted because it'd mess it all due to relations!
      let deletedBrand = await Brand.destroy({
        where: {
          id,
        },
      });
      deletedBrand
        ? res.status(200).send({
          successMsg: "Brand has been deleted.",
          data: deletedBrand,
        })
        : res.status(401).send({ errorMsg: "Brand doesn't exist" });
    } else {
      res.status(401).send({ errorMsg: "Brand can't be deleted because there are products associated" });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};


module.exports = { getBrands, createBrand, deleteBrand };
