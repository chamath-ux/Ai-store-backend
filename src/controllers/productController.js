const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.deleteProduct = async(req,res)=>{
  try {
    const product = await Product.destroy({
  where: {
    id: req.params.id,
  },
});
    res.status(201).json({'message':'successfully deleted'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
}

exports.editProduct = async(req,res)=>{
  const id =req.params.id;
  try {
    const product = await Product.update(req.body,{where: {id}});
    res.status(201).json({'message':'successfully updated'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
}