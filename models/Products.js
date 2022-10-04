const Sequelize = require('sequelize');
const config = require('../config/config');
const store = require('./Store');

const products = config.define('Product', {
    name: {
        type:  Sequelize.STRING,
        allowNull: true
    },
    price: {
        type: Sequelize.STRING,
        allowNull: true
    },
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    }
});

store.hasMany(products, {
    foreignKey: "store_id",
    as: "product_item"
});

module.exports = products;