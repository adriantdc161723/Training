const express = require('express');
const ProductRouter = express.Router();
const ProductController = require('../controller/product.controller');
const AuthService = require('../services/auth.service');




module.exports = ProductRouter;