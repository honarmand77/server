
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
        image
        } = req.body;
  
      // اطلاعات تصویر از طریق req.file در دسترس هستند
      const imageInfo = req.file;
  
      // ایجاد یک نمونه از مدل محصول
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        discountedPrice,
        inventory,
        image
      });
  
      // ذخیره محصول در دیتابیس
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
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'خطای سرور' });
    }
  };