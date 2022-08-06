const {
    Product,
    Brand,
    User, 
    Category,
    Subcategory
  } = require('../db');





  
  const createProduct = async (req, res) => {
    try {
      let {
        name,
        price,
        description,
        image,       
        stock,             
        BrandId,
        weight,
       CategoryId

      } = req.body;
      if (
        !name ||        
        !BrandId ||
        !image ||
        !price ||
        !description ||     
        !stock ||
        ! weight ||
       ! CategoryId
      ) {
        res.status(402).send({ errorMsg: 'Missing data.' });
      } else {
        let [newProduct, created] = await Product.findOrCreate({
          where: {
            name,
            price,
            description,
            image,           
            stock,
            BrandId,
            weight,
           CategoryId
          },
        });
        created
          ? res.status(201).json({
              successMsg: 'The Product has been created.',
              data: newProduct,
            })
          : res.status(401).json({ errorMsg: 'Product already exists.' });
      }
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  };
  
  const updateProduct = async (req, res) => {
    try {
      const id = req.params.id;
      let {
        name,
        description,
        price,
        image,       
        stock,       
        BrandId,
        weight,
        CategoryId      
      } = req.body;
      if (
        !name ||
        !description ||
        !price ||
        !image ||      
        !stock ||        
        !BrandId ||  
        ! weight||
        !CategoryId ||      
        !id
      ) {
        res.status(402).send({ errorMsg: 'Missing data.' });
      } else {
        let productToUpdate = await Product.findOne({
          where: {
            id,
          },
        });
        if (!productToUpdate) {
          res.status(401).send({ errorMsg: 'Product not found.' });
        } else {
          let productUpdated = await productToUpdate.update({
            name,
            price,
            description,
            image,           
            stock,           
            BrandId,
            weight,
            CategoryId         
          });
          res.status(200).send({
            successMsg: 'Product successfully updated.',
            data: productUpdated,
          });
        }
      }
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  };
  
  const getSingleProduct = async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).send({ errorMsg: 'Missing data.' });
      } else {
        let singleProduct = await Product.findOne({
          where: {
            id,
          },
          include: [
            {
              model: Brand,
              attributes: ['name'],
            },
            {
              model: Category,
              attributes: ['name', 'id'],
              include: [
                {
                  model: Subcategory,
                  attributes: ['name', 'id'],
                },
             ],
           }              
          ],
        });
        if (!singleProduct) {
          res.status(404).send({ errorMsg: 'Product not found.' });
        } else {
          singleProduct = {
            id: singleProduct.id,
            name: singleProduct.name,
            image: singleProduct.image,
            price: singleProduct.price,
            description: singleProduct.description,     
            stock: singleProduct.stock,           
            BrandId: singleProduct.BrandId,
            brand: singleProduct.Brand.name,
            weight: singleProduct.weight,            
            isActive: singleProduct.isActive,
           SubcategoryId: singleProduct.Category.Subcategories[0].id,      
          Subcategory: singleProduct.Category.Subcategories[0].name,
            category: singleProduct.Category.name,  
          }
            
            
          console.log('single product: ', singleProduct);
          res
            .status(200)
            .send({ successMsg: 'Here is your product.', data: singleProduct });
        }
      }
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  };
  
  const getProducts = async (req, res) => {
    try {
      let dataProduct = await Product.findAll({
        include: [
          {
            model: Brand,
            attributes: ['name'],
          },
          {
            model: Category,
            attributes: ['name', 'id'],
            include: [
              {
                model: Subcategory,
                attributes: ['name', 'id'],
              },
           ],
         }     
        ],
      });
      if (!dataProduct) {
        res.status(404).send({ errorMsg: 'There are no products available.' });
      } else {
        dataProduct = dataProduct.map((product) => {
          return {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            description: product.description,     
            stock: product.stock,           
            BrandId: product.BrandId,
            brand: product.Brand.name,
            weight: product.weight,            
            isActive: product.isActive,
           SubcategoryId: product.Category.Subcategories[0].id,      
          Subcategory: product.Category.Subcategories[0].name,
            category: product.Category.name,                       
          };
        });
  
        res
          .status(200)
          .send({ successMsg: 'Here are your products.', data: dataProduct });
      }
    } catch (error) {
      res.status(500).send({ errorMsg: error.message });
    }
  };
  
 const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

   // const { isActive } = req.body;

    if (!id) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      Product.destroy( { where: { id: id } });
      res.status(200).send({
        successMsg: 'Product deleted in Database',
        data: `Product id: ${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const setInactiveProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const { isActive } = req.body;

    if (!id) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      Product.update({ isActive: isActive }, { where: { id: id } });
      res.status(200).send({
        successMsg: 'Product deleted in Database',
        data: `Product id: ${id}`,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};




  module.exports = {
    createProduct,
    updateProduct,
    getProducts,
    getSingleProduct,
    deleteProduct,
   setInactiveProduct
  };
  