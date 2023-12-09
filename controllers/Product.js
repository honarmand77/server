
const Product = require('../models/Product');


exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      discountedPrice,
      inventory,
    } = req.body;


    const base64Image = req.body.image;
    const rating = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      discountedPrice,
      inventory,
      rating,
      image: base64Image, 
    });

  
    await newProduct.save();

    res.status(201).json({ message: 'محصول با موفقیت ایجاد شد', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطای سرور' });
  }
};

  
  exports.getProducts = async (req, res) => {
    try {

      const products = await Product.find();
      if(products){
        res.status(200).json(products);
      }else{
        res.status(404).json({ message: 'محصول یافت نشد' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'خطای سرور' });
    }
  };

  
  exports.ProductView = async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await Product.findById(productId);
  
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'محصول یافت نشد' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'خطای سرور' });
    }
  };