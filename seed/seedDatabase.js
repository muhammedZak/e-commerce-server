import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';

import { categories, subCategories } from './categories.js';
import { generateProducts } from './generateProducts.js';

await mongoose.connect(
  'mongodb+srv://muhammedZakariya:muhammedZakariya123@buyvora.zb03tcl.mongodb.net/Buyvora?appName=buyvora',
);

console.log('MongoDB Connected');

// Clear old data
await Category.deleteMany();
await Product.deleteMany();

// Insert categories
const createdCategories = await Category.insertMany(categories);

const createdSubCategories = await Category.insertMany(
  subCategories(createdCategories),
);

console.log('Categories inserted');

// Generate products
const products = generateProducts(
  createdCategories,
  createdSubCategories,
  1000, // number of products
);

await Product.insertMany(products);

console.log('Products inserted');

process.exit();
