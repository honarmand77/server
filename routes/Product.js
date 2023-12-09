
const express = require('express');
const router = express.Router();
const {createProduct , getProducts, ProductView } = require('../controllers/Product');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../server/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});


const fileFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('فقط فایل‌های تصویری مجاز هستند!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});




router.post('/create', upload.single('image') , createProduct);
router.get('/products', getProducts);
router.get('/ProductView/:id', ProductView);


module.exports = router;
