import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';

export const categories = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Men',
    slug: 'men',
    level: 0,
    parent: null,
    description: 'Men clothing and accessories',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Women',
    slug: 'women',
    level: 0,
    parent: null,
    description: 'Women clothing and accessories',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Electronics',
    slug: 'electronics',
    level: 0,
    parent: null,
  },
];

export const subCategories = (parentCategories) => [
  {
    name: 'Shoes',
    slug: 'men-shoes',
    parent: parentCategories[0]._id,
    level: 1,
  },
  {
    name: 'Shirts',
    slug: 'men-shirts',
    parent: parentCategories[0]._id,
    level: 1,
  },
  {
    name: 'Shoes',
    slug: 'women-shoes',
    parent: parentCategories[1]._id,
    level: 1,
  },
  {
    name: 'Mobiles',
    slug: 'mobiles',
    parent: parentCategories[2]._id,
    level: 1,
  },
];
