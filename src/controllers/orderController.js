
const jwt = require('jsonwebtoken');
const Order = require('../models/Order'); // adjust path as needed

exports.initiateOrder = async (req, res) => {
  try {
    const { customerId } = req.body;

    // Create a pending order
    const newOrder = await Order.create({
      customerId,
      status: 'pending'
    });

    // Generate JWT with order and customer info
    const token = jwt.sign(
      { customerId, orderId: newOrder.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' } // Link valid for 15 mins
    );

    // Send the tokenized link (just return for now)
    const link = `https://yourdomain.com/order/confirm?token=${token}`;
    return link;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to initiate order' });
  }
};