const express = require('express');

const productRoutes = require('./routes/productRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path');
const userRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

module.exports = app;
