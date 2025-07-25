const express = require('express');

const productRoutes = require('./routes/productRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path')

connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/whatsapp', whatsappRoutes);

app.use(errorHandler);

module.exports = app;
