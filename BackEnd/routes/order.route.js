import express from 'express';
import { createOrder } from '../controllers/order.controller.js';

const router = express.Router();

// Define your routes here
router.post('/create-order', createOrder);

export default router;