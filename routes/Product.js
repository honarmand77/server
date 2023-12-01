// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {createProduct , getProducts } = require('../controllers/Product');
const multer = require('multer');
const path = require('path');

// تعیین مسیر ذخیره سازی تصاویر
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../server/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// تعیین فیلتر برای نوع فایل‌های قابل قبول
const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('فقط فایل‌های تصویری مجاز هستند!'), false);
  }
};

// تنظیمات multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});






router.post('/create', upload.single('image') , createProduct);
router.get('/products', getProducts);


module.exports = router;
