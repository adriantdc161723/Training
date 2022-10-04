const dotenv = require('dotenv').config();
const  store = require('../models/Store');
const user = require('../models/User');
const product = require('../models/Products');


module.exports = {store, user, product};