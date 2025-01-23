import express from 'express';
import { createOrderForService } from '../controllers/order.controller.js';

const router = express.Router();

// Define your routes here
router.post('/create-order', createOrderForService);

export default router;