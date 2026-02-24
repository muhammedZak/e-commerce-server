import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from '../controllers/categoryController.js';

import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router
  .route('/')
  .post(asyncHandler(createCategory))
  .get(asyncHandler(getAllCategories));

router
  .route('/:id')
  .get(asyncHandler(getCategoryById))
  .put(asyncHandler(updateCategory))
  .delete(asyncHandler(deleteCategory));

export default router;
