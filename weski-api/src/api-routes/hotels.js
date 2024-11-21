import express from 'express';
import controller from '../controllers/hotels.js';

const router = express.Router();

router.get('/search', controller.searchHotels);

export default router;
