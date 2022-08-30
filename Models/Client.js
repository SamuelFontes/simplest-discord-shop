const Sequelize = require('sequelize');
const database = require('../db');

const Client = database.define('Client', {
    clientId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dateCreated: {
        type: Sequelize.DATE
    },
    contractURL: Sequelize.STRING
})

module.exports = Client;