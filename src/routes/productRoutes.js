const express = require('express');
const router = express.Router();
const { getProducts, createProduct, deleteProduct, editProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id',editProduct);

module.exports = router;