import Product from '../models/productModel.js';

const createProduct = async (req, res) => {
  const productData = req.body;

  const product = await Product.create(productData);

  res.status(201).json({
    status: true,
    data: product,
  });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: true,
    data: products,
  });
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    status: true,
    data: product,
  });
};

const deleteProduct = async (req, res) => {};

export { createProduct, getAllProducts, getProductById, deleteProduct };
