const Sequelize = require('sequelize');
const database = require('../db');

const Order = database.define('Order', {
    orderId: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    clientId: {
        type: Sequelize.BIGINT,
        references: {
            model: 'Client',
            key: 'clientId'
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Product',
            key: 'productId'
        }
    },
    dateCreated: {
        type: Sequelize.DATE
    },
    totalPrice: {
        type: Sequelize.DOUBLE
    },
    paidPrice: {
        type: Sequelize.DOUBLE
    },

})

module.exports = Order;