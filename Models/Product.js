const Sequelize = require('sequelize');
const database = require('../db');

const Product = database.define('product', {
    productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE
    },
    dateCreated: {
        type: Sequelize.DATE
    },
    description: Sequelize.STRING
})

module.exports = Product;