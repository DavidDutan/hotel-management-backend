const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');
const Room = require('./Room'); // Asegúrate de que la ruta sea correcta

const Guest = sequelize.define('Guest', {
    Id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: { type: DataTypes.STRING, allowNull: false },
    Identification: { type: DataTypes.STRING, allowNull: false },
    RoomAssigned: { 
        type: DataTypes.INTEGER, 
        references: {
            model: Room, // Nombre del modelo referenciado
            key: 'RoomNumber'
        },
        allowNull: false
    },
    CheckIn: { type: DataTypes.DATE, allowNull: false },
    CheckOut: { type: DataTypes.DATE }
}, { timestamps: false });

module.exports = Guest;
