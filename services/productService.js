import Product from '../models/productModel.js';

const createProductService = async (productData) => {
  try {
    const product = await Product.create(productData);

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllProducts = async (query) => {};

const getProductById = async (productId) => {};

const deleteProduct = async (productId) => {};

export { createProductService, getAllProducts, getProductById, deleteProduct };
