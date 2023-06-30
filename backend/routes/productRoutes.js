import express from 'express';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/top').get(getTopProducts);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);
export default router;
