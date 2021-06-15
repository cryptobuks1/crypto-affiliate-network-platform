import express from 'express';
const router = express.Router();

import profileController from '../controllers/profileController';

router.get('/profile', profileController);

export default router;