import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
} from '../controllers/productController.js';

import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router
  .route('/')
  .post(asyncHandler(createProduct))
  .get(asyncHandler(getAllProducts));

router.get('/:id', asyncHandler(getProductById));
router.delete('/:id', asyncHandler(deleteProduct));

export default router;
