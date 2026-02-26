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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const total = await Product.countDocuments();

  const products = await Product.find().skip(startIndex).limit(limit);

  res.status(200).json({
    status: true,
    count: products.length,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
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
