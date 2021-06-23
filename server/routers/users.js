import express from 'express';
import upload from '../middleware/upload';
const router = express.Router();

import profileController from '../controllers/users/profileController';
import uploadController from '../controllers/users/uploadController';
import requestMoneyController from '../controllers/users/requestMoneyController';
import myReferralsController from '../controllers/users/myReferralsController';
import myRequestsController from '../controllers/users/myRequestsController';
import getPersonalController from '../controllers/users/getPersonalController';
import updatePersonalController from '../controllers/users/updatePersonalController';
import updatePasswordController from '../controllers/users/updatePasswordController';
import setUserTokenController from '../controllers/users/setUserTokenController';
import verifyEmailController from '../controllers/users/verifyEmailController';
import updateEmailController from '../controllers/users/updateEmailController';

router.get('/profile', profileController);
router.post('/upload', upload.array('files', 10), uploadController);
router.post('/request-money', requestMoneyController);
router.get('/my-referrals', myReferralsController);
router.get('/my-requests', myRequestsController);
router.get('/profile/personal', getPersonalController);
router.put('/profile/personal', updatePersonalController);
router.put('/profile/update-password', updatePasswordController);
router.get('/profile/set-token', setUserTokenController);
router.put('/profile/verify-email', verifyEmailController);
router.put('/profile/update-email', updateEmailController);

export default router;
