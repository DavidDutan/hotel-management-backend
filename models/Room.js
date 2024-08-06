const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const Room = sequelize.define('Room', {
    RoomNumber: { type: DataTypes.INTEGER, primaryKey: true },
    IsOccupied: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: false });

module.exports = Room;
