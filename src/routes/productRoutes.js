const express = require('express');
const router = express.Router();
const { getProducts, createProduct, deleteProduct, editProduct } = require('../controllers/productController');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/',getProducts);
router.post('/',isAdmin,createProduct);
router.delete('/:id',isAdmin,deleteProduct);
router.put('/:id',isAdmin,editProduct);

module.exports = router;