const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const Erroehandeler = require('./error/Errorhandeler');
const dotenv = require('dotenv').config;
const PORT = 3002;


mongoose.connect("mongodb://127.0.0.1:27017/cyangallery", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  }, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MongoDB');
  }
});



app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());




const UserRoutes = require('./routes/User');
const productRoutes = require('./routes/Product');


app.use('/api',UserRoutes)
app.use('/api', productRoutes)












app.use(Erroehandeler)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
