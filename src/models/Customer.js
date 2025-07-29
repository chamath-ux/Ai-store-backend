const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Customer = sequelize.define('Customer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PhoneNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Customer;