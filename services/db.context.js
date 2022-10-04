const dotenv = require('dotenv').config();
const  store = require('../models/Store');
const user = require('../models/User');
const product = require('../models/Products');



//Associations:::::::::::::::::::::

//Has Many
store.hasMany(product, {
    foreignKey: "store_id",
    as: "product_item"
});


//Belongs to
product.belongsTo(store, {
    foreignKey: "store_id",
    as: "store_info"
})


module.exports = {store, user, product};