import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const brands = [
  'Nike',
  'Adidas',
  'Puma',
  'Apple',
  'Samsung',
  'Levis',
  'Zara',
  'H&M',
];

const colors = ['Red', 'Blue', 'Black', 'White', 'Green'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

function generateSKU() {
  return 'SKU-' + Math.random().toString(36).substring(2, 10).toUpperCase();
}

function generateVariants() {
  const variants = [];

  colors.forEach((color) => {
    sizes.forEach((size) => {
      variants.push({
        sku: generateSKU(),
        attributes: { color, size },
        price: Math.floor(Math.random() * 5000) + 500,
        discountPrice: Math.floor(Math.random() * 4000) + 400,
        stock: Math.floor(Math.random() * 50),
        images: ['https://picsum.photos/500/500?random=' + Math.random()],
      });
    });
  });

  return variants;
}

export function generateProducts(categories, subCategories, count = 1000) {
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subCategory =
      subCategories[Math.floor(Math.random() * subCategories.length)];

    products.push({
      name: `Product ${i}`,
      slug: `product-${i}`,
      description: `Description for product ${i}`,
      category: category._id,
      subCategory: subCategory._id,
      brand: brands[Math.floor(Math.random() * brands.length)],
      variants: generateVariants(),
      totalStock: Math.floor(Math.random() * 500),
      isActive: true,
    });
  }

  return products;
}
