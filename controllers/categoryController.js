import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';
import { slugify } from '../utils/slugify.js';
import AppError from '../errors/AppError.js';

// CREATE CATEGORY

export const createCategory = async (req, res) => {
  const { name, description, parent } = req.body;

  if (!name) {
    throw new AppError('Category name is required', 400);
  }

  const slug = slugify(name);

  const isCategoryExist = await Category.findOne({ slug });

  if (isCategoryExist) {
    throw new AppError('Category already exist', 400);
  }

  if (parent && !mongoose.Types.ObjectId.isValid(parent)) {
    throw new AppError('Invalid parent category ID', 400);
  }

  const category = await Category.create({
    name,
    slug,
    description,
    parent: parent || null,
  });

  res.status(201).json({
    success: true,
    data: category,
  });
};

export const getAllCategories = async (req, res) => {
  const categories = await Category.find().populate('parent');
  res.status(200).json({
    success: true,
    results: categories.length,
    data: categories,
  });
};

export const getCategoryById = async (req, res) => {};
export const updateCategory = async (req, res) => {};
export const deleteCategory = async (req, res) => {};
