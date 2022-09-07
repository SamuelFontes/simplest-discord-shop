const Sequelize = require('sequelize');
const database = require('../db');

const Order = database.define('Orders', {
    orderId: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    clientId: {
        type: Sequelize.BIGINT,
        references: {
            model: 'Clients',
            key: 'clientId'
        }
    },
    productId: {
        type: Sequelize.BIGINT,
        references: {
            model: 'Products',
            allowNull: true,
            key: 'productId'
        }
    },
    dateCreated: {
        type: Sequelize.DATE
    },
    totalPrice: {
        type: Sequelize.DOUBLE
    },
    isPaid:{
        type: Sequelize.BOOLEAN
    },
    datePaid: {
        type: Sequelize.DATE
    },
    isClosed:{
        type: Sequelize.BOOLEAN
    },
    dateClosed: {
        type: Sequelize.DATE
    },
    isCanceled:{
        type: Sequelize.BOOLEAN
    },
    dateCanceled: {
        type: Sequelize.DATE
    },
    mainMessageId:{
        type: Sequelize.BIGINT,
    }

})

module.exports = Order;