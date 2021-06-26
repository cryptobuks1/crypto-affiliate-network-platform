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
import balanceHistoryController from '../controllers/users/balanceHistoryController';
import inviteFriendController from '../controllers/users/inviteFriendController';
import newKycController from '../controllers/users/kycController';
import myKycController from '../controllers/users/getKycController';
import myEarningsController from '../controllers/users/myEarningsController';
import myLoginHistoryController from '../controllers/users/loginHIstoryController';
import requestWithdrawalController from '../controllers/users/requestWithdrawalController';
import myWithdrawalsController from '../controllers/users/myWithdrawalsController';
import cancelWithdrawalController from '../controllers/users/cancelWithdrawalController';


router.get('/profile', profileController);
router.post('/upload', upload.array('files', 10), uploadController);
router.post('/request-money', requestMoneyController);
router.post('/request-withdrawal', requestWithdrawalController);
router.put('/cancel-withdrawal', cancelWithdrawalController);

router.get('/my-referrals', myReferralsController);
router.get('/my-requests', myRequestsController);
router.get('/my-earnings', myEarningsController);
router.get('/my-history', myLoginHistoryController);
router.get('/my-withdrawals', myWithdrawalsController);

router.get('/profile/personal', getPersonalController);
router.put('/profile/personal', updatePersonalController);
router.put('/profile/update-password', updatePasswordController);
router.get('/profile/set-token', setUserTokenController);
router.put('/profile/verify-email', verifyEmailController);
router.put('/profile/update-email', updateEmailController);


router.get('/dashboard/balance-history', balanceHistoryController);
router.post('/dashboard/invite-friend', inviteFriendController);
router.post('/dashboard/kyc-request', newKycController);
router.get('/dashboard/my-kyc', myKycController);


export default router;
