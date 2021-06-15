import express from 'express';
const router = express.Router();

import signInController from '../controllers/signInController';
import signUpController from '../controllers/signUpController';

router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);

export default router;