const { DataTypes } = require('sequelize');
const sequelize = require('../config/config');

const AuditLog = sequelize.define('AuditLog', {
    TableName: { type: DataTypes.STRING },
    Operation: { type: DataTypes.STRING },
    OldValue: { type: DataTypes.TEXT },
    NewValue: { type: DataTypes.TEXT }
}, { timestamps: false });

module.exports = AuditLog;
