const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Customer = require('../models/Customer');

const Order = sequelize.define('Order', {
  cusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  }
});

// Optional: define association
Customer.hasMany(Order, { foreignKey: 'cusId' });
Order.belongsTo(Customer, { foreignKey: 'cusId' });

 Order.afterCreate(async (order, options) => {
    console.log(`Order ${order.id} created!`);
    // You can trigger webhook or notification here
  });

module.exports = Order;