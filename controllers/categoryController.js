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

//GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
  const categories = await Category.find().populate('parent');
  res.status(200).json({
    success: true,
    results: categories.length,
    data: categories,
  });
};

//GET SINGLE CATEGORY
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid category ID', 400);
  }

  const category = await Category.findById(id).populate('parent');

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
};

//UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid category ID', 400);
  }

  const { name, description, parent, isActive } = req.body;

  const updatedData = {};

  if (name) {
    ((updatedData.name = name), (updatedData.slug = slugify(name)));
  }

  if (description !== undefined) {
    updatedData.description = description;
  }

  if (parent !== undefined) {
    if (parent && !mongoose.Types.ObjectId.isValid(parent)) {
      throw new AppError('Invalid parent category ID', 400);
    }

    updatedData.parent = parent;
  }

  if (isActive !== undefined) updatedData.isActive = isActive;

  const category = await Category.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
};

//DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid category ID', 400);
  }

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully',
  });
};
