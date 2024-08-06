const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('HotelSystem', 'root', 'ddutans', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
