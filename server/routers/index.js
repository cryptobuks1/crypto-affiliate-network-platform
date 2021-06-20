import express from 'express';
const router = express.Router();

import signInController from '../controllers/signInController';
import signUpController from '../controllers/signUpController';
import requestTokenController from '../controllers/requestTokenController';
import updatePasswordController from '../controllers/updatePasswordController';

router.post('/sign-up', signUpController);
router.post('/sign-in', signInController);
router.put('/reset-password', requestTokenController);
router.put('/update-password', updatePasswordController);

export default router;