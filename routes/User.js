const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {signup , signin, logout , admin, userinfo} = require('../controllers/User')

router.post('/signup' , signup)
router.post('/signin' , signin)
router.get('/logout' , logout)
router.get('/admin' , admin)
router.get('/userinfo/:id' , userinfo)


module.exports = router;
